import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { questionsAction } from "../../../store/QuestionsConverted";
import Tesseract from "tesseract.js";
import { globalActions } from "../../../store/globalSlice";

function AddByPhoto() {
  // {workerId: 'Worker-0-0bad2', jobId: 'Job-0-70919', status: 'recognizing text', progress: 0.014285714285714285}
  const fileRef = useRef();
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const processPhoto = () => {
    Tesseract.recognize(fileRef.current.files[0], "eng+ara", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setProgress(Math.trunc(m.progress * 100));
        }
      },
    }).then(({ data: { text } }) => {
      text=text.replaceAll('@', 'a')
      text=text.replaceAll('©', 'c')
      text = text.replaceAll("¢", "c");
      setData(data + "\n" + text);
    });
  };

  const [convertType, setConvertType] = useState("Normal Choise")

  const convertToQuestionsArabic = (x) =>{
    let questions = [];
    for(let i = 0 ; i < x.length ; i++){
        let question = {};
        question["number"] = i + 1;

        

        question["text"] = x.slice(x.indexOf(String(i+1)+"."),x.indexOf('أ '))
        x = x.replace(x.slice(x.indexOf(String(i+1)+"."),x.indexOf('أ ')),"")
        
        question["answer1"] = x.slice(x.indexOf("أ "),x.indexOf('ب '))
        x= x.replace(x.slice(x.indexOf("أ "),x.indexOf('ب ')) ,"")
        
        question["answer2"] = x.slice(x.indexOf("ب "),x.indexOf('ج '))
        x= x.replace(x.slice(x.indexOf("ب "),x.indexOf('ج ')) ,"")
        
        question["answer3"]  = x.slice(x.indexOf("ج "),x.indexOf('د '))
        x= x.replace(x.slice(x.indexOf("ج "),x.indexOf('د ')) ,"")

        question["answer4"]  = x.slice(x.indexOf("د "),x.indexOf(String(i+2)+"."))
        x= x.replace(x.slice(x.indexOf("د ")),x.slice(x.indexOf(String(i+2)+".")) ,"")
        question["answer"] = null;
        questions.push(question);
    }
    dispatch(questionsAction.addQuestions(questions));
  }
  
  const convertToQuestions = (x) => {
    let questions = [];
    for (let i = 0; i < x.length; i++) {
      let question = {};
      question["number"] = i + 1;

      

      question["text"] = x.slice(x.indexOf(String(i + 1) + "."), x.indexOf("a."))
      x = x.replace(
        x.slice(x.indexOf(String(i + 1) + "."), x.indexOf("a.")),
        ""
      );

      question["answer1"] = x.slice(x.indexOf("a."), x.indexOf("b."));
      x = x.replace(x.slice(x.indexOf("a."), x.indexOf("b.")), "");

      question["answer2"] = x.slice(x.indexOf("b."), x.indexOf("c."));
      x = x.replace(x.slice(x.indexOf("b."), x.indexOf("c.")), "");

      question["answer3"] = x.slice(x.indexOf("c."), x.indexOf("d."));
      x = x.replace(x.slice(x.indexOf("c."), x.indexOf("d.")), "");

      question["answer4"] = x.slice(
        x.indexOf("d."),
        x.indexOf(String(i + 2) + ".")
      );

      x = x.replace(
        x.slice(x.indexOf("d.")),
        x.slice(x.indexOf(String(i + 2) + ".")),
        ""
      );
      question["answer"] = null;
      questions.push(question);
    }
    dispatch(questionsAction.addQuestions(questions));
  };

  
  const [direction, setDirection] = useState("ltr")
  const goToAddExam = () => {
    dispatch(questionsAction.clearState());
    if(convertType === "Normal Choise" || convertType === "Translate To English")
    {
      convertToQuestions(data);
      setDirection("ltr")
    }
    else if (convertType === "Translate To Arabic") {
      convertToQuestionsArabic(data)
      setDirection("rtl")
    }
    
    dispatch(globalActions.addExam());
    setData("")
  };

  return (
    <div className="container-fluid ">
      <div className="col-xs-6 m-auto  w-75">
        {/* action="javascript:void(0)" */}
        <form id="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <div className="input-group my-4 m-auto">
              <input
                ref={fileRef}
                type="file"
                className="form-control"
                id="myFile"
              />
              <label className="input-group-text" htmlFor="myFile">
                Upload
              </label>
            </div>
          </div>
          <div className="form-group">
            <select className="form-control" id="lang" onChange={(e)=>setConvertType(e.target.value)}>
              <option name='normal_choise'>Normal Choise</option>
              <option name='translate_to_english'>Translate To English</option>
              <option name='translate_to_arabic'>Translate To Arabic</option>
            </select>
          </div>
          <div className="form-group mt-4 text-center">
            <input
              onClick={processPhoto}
              className="btn btn-outline-primary"
              type="submit"
              value="Convert"
            />
            <div className="progress my-4">
              <div
                className="progress-bar"
                role="progressbar"
                aria-label="Example with label"
                style={{ width: `${progress}%` }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {progress}%
              </div>
            </div>
            <div className="form-floating">
              <textarea
                value={data}
                onChange={(e) => {
                  setData(e.target.value);
                }}
                className="form-control "
                placeholder="Leave a comment here"
                style={{ minHeight: "200px" , direction : direction}}
                id="floatingTextarea2"
              ></textarea>
            </div>
          </div>
        </form>
        <button
          className="btn btn-outline-success mx-auto d-block mt-5"
          onClick={goToAddExam}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddByPhoto;