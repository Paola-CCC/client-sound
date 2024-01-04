import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import './Quizz.scss';
import { useAPIContext } from "../../contexts/APIContextProvider";
import { Button } from "../../common/Index";
import { AuthContext } from "../../contexts/AuthContextProvider";


const Quizz = () => {

  const { courseId } = useParams();
  const [quizzQuestion, setQuizzQuestion] = useState([]);
  const [selectedAnswers, setselectedAnswers] = useState({});
  const [quizzId, setQuizzId] = useState('');
  const [result, setResult] = useState('');
  const [isSubmissionSuccessfull, setSubmissionSuccessfull] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitIsAllow, setSubmitIsAllow] = useState(null);
  const [formWasSubmited, setFormWasSubmited] = useState(false);
  const { userId } = useContext(AuthContext);

  const { quizzAPI } = useAPIContext();


  const checkData = () => {
    let currentSelectedAnswersLength = Object.keys(selectedAnswers).length + 1;
    if (currentSelectedAnswersLength !== Object.keys(quizzQuestion).length) {
      setSubmitIsAllow(false);
    } else {
      setSubmitIsAllow(true);
    }
  }

  useEffect(() => {
    const getQuizz = async () => {
      try {
        const response = await quizzAPI.showQuizz(courseId);
        const quizzId = response.data[0].id;
        setQuizzId(quizzId);
        setQuizzQuestion(response.data[0].question);
      } catch (error) {
        console.log('Error loading quizzes', error)
      }
    };
    getQuizz();
  }, [courseId]);

  const submitAnswers = async () => {
    if(submitIsAllow ){
      try {
        const answers = Object.entries(selectedAnswers).map(([questionId, selectedAnswer]) => ({
          question_id: questionId,
          selected_answer: selectedAnswer,
          userId: parseInt(userId)
        }));
        const response = await quizzAPI.addAnswers(quizzId,{answers});
        setResult(response.data);
        if(Object.values(response.data).length > 0){
          setFormWasSubmited(true);
        }
        setSubmissionSuccessfull(true);
        setSuccessMessage('Vos réponses ont été soumises avec succès!');
      } catch (error) {
        console.error(error);
      }
    } 
  };

  const handleSelectAnswer = (questionId, selectedAnswer) => {
    setselectedAnswers({...selectedAnswers, [questionId]: selectedAnswer,
    });
    checkData();
  };

  return (
    <div className="global-container-quizz">

      <section>
        <h1>Quizz</h1>
        <h4>Évaluer vos connaissances :</h4>

        { quizzQuestion !== undefined  && Object.values(quizzQuestion).length > 0 ? (
            quizzQuestion.map((question,index)=> (
              <div key={index} className="quizz-container">
                <h6>{question.content}</h6>
                <div className="quizz-suggests">
                  {Object.values(question.suggests).map((suggests,key) => (
                    <Button key={key}  isSelected={Object.values(selectedAnswers).includes(suggests.id) ? true : false} kind={`${(suggests.response_expected && formWasSubmited ) ? 'good-answers' : (suggests.response_expected === false && formWasSubmited ) ? 'false-answers' : '' }`}  onClick={(e) => handleSelectAnswer(question.id, suggests.id)}>
                      {suggests.content}
                    </Button>
                  ))}
                </div>
              </div>))
            ) 
          : null
        }

        <div className="btn-quizz-submit">
          <Button onClick={submitAnswers} kind={'primary'} disabled={ submitIsAllow ? false : true } >Soumettre les réponses </Button>
        </div>

        {isSubmissionSuccessfull && result &&(
          <div className="container-result">
            <p className="success-message">
              {successMessage} Voici votre score : {result.score} /{quizzQuestion.length}
            </p>
          </div>
        )}

        {errorMessage !== ''  && submitIsAllow === false && (
          <p className="error-message">
            {errorMessage}
          </p>
        )}
      </section>
    </div>
  );
};

Quizz.propTypes = {};

Quizz.defaultProps = {};

export default Quizz;
