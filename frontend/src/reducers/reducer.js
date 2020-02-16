import * as TYPES from './../constands/constan.login'
let initialState = {
    email:'',
    password:'',
    isValidUser:false,
    userData:{
        isFetching:false,
        didInvalidate:false,
        data:{}
    },
    examData:{
        isFetching:false,
        didInvalidate:false,
        data:{}
    },
    scoreData:{
        isFetching:false,
        isValidUser:false,
        isSubmitted:false,
        score:0
    }
}
const setInitialState = newValue =>{
    initalState = newValue
}
const getInitialState = ()=>(initialState)

const reducer = (state,action)=>{
    const type = action.type ;
    const value = action.value;
    const questionId = action.id;
    const questionType = action.questionType;

    switch(type){
        case TYPES.READ_EMAIL:
            return Object.assign({},state,{email:value});
        case TYPES.READ_PASSWORD:
            return Object.assign({},state,{password:value})
        case TYPES.BEGIN_FETCH:
            return{
                ...state,
                userData:{
                    ...state.userData,
                    isFetching:true
                }
            }
        case TYPES.SUCCEED: {
            console.log(value)
            return {
                ...state,
                isValidUser:value.status,
                userData:{
                    ...state.userData,
                    isFetching:false,
                    data:value
                }
            }
        }
        case TYPES.FAIL :
            return {...state,userData:{...state.userData,isFetching:false,didInvalidate:true}}
        case TYPES.EXAM_FETCH_BEGIN:
            return {
                ...state,
                examData:{
                    ...state.examData,
                    isFetching:true
                }
            }
        case TYPES.EXAM_FETCH_SUCCEED:

        return{
            ...state,
            examData:{
                ...state.examData,
                isFetching:true,
                data:value
            }
        }
        case TYPES.EXAM_FETCH_FAIL:
            return{
                ...state,
                examData:{
                    ...state.examData,
                    isFetching:false,
                    didInvalidate:true
                }
            }
        case TYPES.EXIT_EXAM:
            return{
                ...state,
                isValidUser:false,
                email:'',
                password:''

            }
        case TYPES.SET_ANSWEWR:{
            const oldData = state.examData.data;
            const section = 'section'+questionType ;
            const oldSection = oldData[section] ;
            const index = oldSection.findIndex(item=>item.id===questionId);
            const newItem = {...oldSection[index],answer:value}
            const newSection = [ ...oldSection.slice(0,index),newItem,...oldSection.slice(index+1)];
            const newdata = {...oldData,[section]:newSection}
            return {...state,examData:{...state,examData,data:newdata}}

        }
        case TYPES.ANSWEWR_SEND_BEGIN:
            return{
                ...state,scoreData:{...state.scoreData,isFetching:true}

            }
        case TYPES.ANSWEWR_SEND_SUCCEED:
            return{
                ...state,isValidUser:false,email:'',password:'',scoreData:{
                    ...state.scoreData,
                    isFetching:false,
                    isSubmitted:true,
                    score:value
                }
            }
        case TYPES.ANSWEWR_SEND_FAIL:
            return{
                ...state,isValidUser:false,
                email:'',
                password:'',
                scoreData:{
                    ...state.scoreData,
                    isFetching:false,
                  didInvalidate:true

                }
            }
            default:
                return state
    }
}
export {getInitialState,setInitialState,reducer}