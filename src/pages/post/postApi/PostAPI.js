import axios from 'axios';
import { getReadypost,getPostedit,getPostsearch,getAlllow,getComment,getPostlist, getAlllowboard,getSortlist,getPostdatainboard,getPostdatainboardpin,getDetail,getFile } from '../module/PostReducer';
import {getAllboard}  from '../module/PostReducer';

const DOMAIN = 'http://localhost:8080'
export const tunckMiddleware=({dispatch,getState})=>next=>action=>{
    if(typeof action==='fuction'){
        return action(dispatch,getState);
    }
    return next(action);
    }
  

export const request = async (method, url, data) => {
    try {
      const response = await axios({
        method,
        url: `${DOMAIN}${url}`,
        data
      });
      return response.data; // 데이터만 반환
    } catch (error) {
      console.error('Request error:', error);
      throw error; // 오류를 다시 throw하여 호출자가 처리할 수 있도록 함
    }
  };
export function callGETReadyPost(empCode){
  return async(dispatch,getState)=>{
    try{
      const result=await request("GET",`/post/ReadyPost/${empCode}`)
      dispatch(getReadypost(result))
    }catch(error){
      throw(error)
    }
  }
}

export function callGETPostEdit(postCode){
  return async(dispatch,getState)=>{
        try{
      const result=await request("GET",`/post/PostEdit/${postCode}`)
      console.log("callGETPostEdit",result);
      dispatch(getPostedit(result))
    }catch(error){
      throw(error)
    }

  }
}

  export function callGETSoftList(){
    return async (dispatch,getState)=>{
      console.log("callGETSortList call");
      try{
        const result=await request('GET',"/post/sortList");
        console.log("sortList",result);
        dispatch(getSortlist(result));
      }catch(error){
        console.log("error",error);
        throw(error);
      }
    }
  }
  export function getAllLowBoard(){
    return async (dispatch,getState)=>{
      try{
        const result=await request('GET',`/post/getAllLowBoard`);
        console.log(result);
        dispatch(getAlllow(result))
      }catch(error){
        console.log(error)
      }
    };
  }

  export function callGETDetail(postCode){
    return async (dispatch,getState)=>{
      try{
        const result=await request('GET',`/post/getDetail/${postCode}`);
        dispatch(getDetail(result))
      }catch(error){
        console.log(error)
      }
    };
  }
  export function callGETFile(postCode){
    return async (dispatch,getState)=>{
      try{
        const result=await request('GET',`/post/callGETFile/${postCode}`);
        dispatch(getFile(result))
        console.log(result)
      }catch(error){
        console.log(error)
      }
    };
  }
  export function callGETComment(postCode){
    return async (dispatch,getState)=>{
      try{
        const result=await request('GET',`/post/commentList/${postCode}`);
        dispatch(getComment(result))
        console.log(result)
      }catch(error){
        console.log(error)
      }
    };
  }
  export function callGETpostSearch(postSearch) {
    return async (dispatch, getState) => {
      console.log("callGETpostSearch call");
      try {
        const result = await request('GET', `/post/postSearch/${postSearch}`);
        console.log("postSearch",result);
        dispatch(getPostsearch(result)); // 액션 생성자 호출 시 result.data를 전달
        console.log("postSearch",result);
      } catch (error) {
        console.error("Error fetching post list:", error);
      }
    };
  }


  export function callGETPostList(page, pageSize) {
    return async (dispatch, getState) => {
      console.log("callGETPostList call");
      try {
        const result = await request('GET', `/post/list?page=${page}&pageSize=${pageSize}`);
        dispatch(getPostlist(result)); // 액션 생성자 호출 시 result.data를 전달
        console.log(result);
      } catch (error) {
        console.error("Error fetching post list:", error);
      }
    };
  }
  export function callGETInboardList(lowBoardCode) {
    return async (dispatch, getState) => {
      console.log("callGETPostList call");
      try {
        const result = await request('GET', `/post/callGETInboardList/${lowBoardCode}`);
        dispatch(getPostdatainboard(result)); // 액션 생성자 호출 시 result.data를 전달
        console.log(result);
      } catch (error) {
        console.error("Error fetching post list:", error);
      }
    };
  }
  export function callGETInboardPinList(lowBoardCode) {
    return async (dispatch, getState) => {
      console.log("callGETPostList call");
      try { 
        const result = await request('GET', `/post/callGETInboardPinList/${lowBoardCode}`);
        dispatch(getPostdatainboardpin(result)); // 액션 생성자 호출 시 result.data를 전달
        console.log(result);
      } catch (error) {
        console.error("Error fetching post list:", error);
      }
    };
  }

  export function callGETBoardList() {
    return async (dispatch, getState) => {
      console.log("callGETBoardList call");
      try {
        const result = await request('GET', "/post/getAllBoard");
        console.log(result);
        console.table(result);
        console.table(typeof result);
        console.table(result instanceof Array);

        dispatch(getAllboard(result)); // 액션 생성자 호출 시 result.data를 전달
        console.log(result);
      } catch (error) {
        console.error("Error fetching post list:", error);
      }
    };
  }
  export function callGETLowBoardList(boardCode) {
    return async (dispatch, getState) => {
      console.log("callGETLowBoardList call");
      try {
        console.log(boardCode);
        const result = await request('GET', `/post/getLowBoard/${boardCode}`);
        console.log(result);
        dispatch(getAlllowboard(result)); // 액션 생성자 호출 시 result.data를 전달
        console.log(result);
      } catch (error) {
        console.error("Error fetching post list:", error);
      }
    };
  }


  export function callPOSTCreatePost(postData) {
    return async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('postName', postData.postName);
            formDataToSend.append('postCon', postData.postCon);
            formDataToSend.append('attachFile', postData.attachFile);
            formDataToSend.append('postCommSet', postData.postCommSet);
            formDataToSend.append('lowBoardCode', postData.lowBoardCode);
            formDataToSend.append("psCode",postData.psCode);
    

            const response = await fetch('http://localhost:8080/post/add', {
                method: 'POST',
                body: formDataToSend,
                // 필요에 따라 다른 옵션들을 추가할 수 있습니다 (ex: headers 설정 등)
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const result = await response.json();
            console.log('Created post:', result);
            console("files:",postData.attachFile.Array)

            // 추가적인 작업이 필요하면 여기서 dispatch 등을 통해 처리할 수 있습니다
        } catch (error) {
            console.error('Error creating post:', error);
            // 에러 처리를 위한 로직을 추가할 수 있습니다
        }
    };
}
