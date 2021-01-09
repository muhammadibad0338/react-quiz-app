import React from 'react';
import { AnswerObject } from './../App';
import './../App.css';

type Props = {
    question: string;
    answer: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({ 
    question,
    answer,
    callback,
    userAnswer,
    questionNr,
    totalQuestions }) => {
    return (
        <div className="card">
            <p className="number">Question : {questionNr}/{totalQuestions}</p>
            <h4 dangerouslySetInnerHTML={{__html:question}}/>
            <div>
                {answer.map(answer=>{
                    return(<div>
                        <button className="cardButton" disabled={userAnswer?true:false} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html:answer}}/>
                        </button>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default QuestionCard;
