

export type Question = {
    category : string;
    correct_answer : string;
    difficulty : string;
    incorrect_answers : string[];
    question : string;
    type : string;
}

export enum Difficulty{
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export type QuestionState =Question & {answers : string[]}

const shuffleArray = (array:any[])=>
[...array].sort(()=> Math.random() - 0.5)

export const fetchQuizQuestions = async (amount:number,difficulty:Difficulty)=>{
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data = await(await (await fetch(endpoint)).json());
    //console.log(data)
    return data.results.map((question:Question)=>(
        {
            ...question,
            answers : shuffleArray(question.incorrect_answers.concat(question.correct_answer))
        }
        ))
}
