import { handleActions, createActions } from "redux-actions";

const initialState = {
  Postdata: [],
  BoardState: [], // 게시판 데이터
  LowBoardState: [], // 소분류 게시판 데이터
  SortListState:[],
  PostdataInBoard:[], //특정 게시판의 글
  PostdataInBoardPin:[], //특정 게시판의 고정글
  DetailState:[],
  FileState:[],
  CommentState:[],
  AllLowState:[]
};

const GET_POSTLIST = 'post/GET_POSTLIST';
const GET_ALLBOARD = 'post/GET_ALLBOARD';
const GET_ALLLOWBOARD = 'post/GET_ALLLOWBOARD';
const GET_SORTLIST='post/GET_SORTLIST';
const GET_POSTDATAINBOARD='post/GET_POSTDATAINBOARD';
const GET_POSTDATAINBOARDPIN='post/GET_POSTDATAINBOARDPIN';
const GET_DETAIL='post/GET_DETAIL'
const GET_FILE='post/GET_FILE'
const GET_COMMENT='post/GET_COMMENT'
const GET_ALLLOW='post/GET_ALLLOW'

// 액션 생성자 함수 생성
export const { post: { getAlllow,getComment,getFile,getPostlist, getAllboard, getAlllowboard,getSortlist,getPostdatainboard,getPostdatainboardpin,getDetail } } = createActions({
  [GET_POSTLIST]: postlist => ({ postlist }),
  [GET_ALLBOARD]: boardlist => ({ boardlist }),
  [GET_ALLLOWBOARD]: lowboardlist => ({ lowboardlist }),
  [GET_SORTLIST]:sortlist=>({sortlist}),
  [GET_POSTDATAINBOARD]: postdatainboardlist=>({postdatainboardlist}),
  [GET_POSTDATAINBOARDPIN]: postdatainboardpin=>({postdatainboardpin}),
  [GET_DETAIL]:detaildata=>({detaildata}),
  [GET_FILE]:filelist=>({filelist}),
  [GET_COMMENT]:commentlist=>({commentlist}),
  [GET_ALLLOW]:alllowlist=>({alllowlist})
});

// 확인용 로그 : 이다정 주석처리
// console.log("getPostlist", getPostlist);
// console.log("getAllBoard", getAllboard);
// console.log("getAllLowBoard", getAlllowboard);
// console.log("getSortlist",getSortlist);
// console.log("getAlllow",getAlllow);

// 초기 상태 및 리듀서 정의
const postReducer = handleActions(
  {
    [GET_POSTLIST]: (state, { payload }) => ({
      ...state,
      Postdata: payload.postlist
    }),
    [GET_ALLBOARD]: (state, { payload }) => ({
      ...state,
      BoardState: payload.boardlist
    }),
    [GET_ALLLOWBOARD]: (state, { payload }) => ({
      ...state,
      LowBoardState: payload.lowboardlist
    }),
    [GET_SORTLIST]:(state,{payload})=>({
      ...state,
      SortListState:payload.sortlist
    }),
    [GET_POSTDATAINBOARD]:(state,{payload})=>({
      ...state,
      PostdataInBoard:payload.postdatainboardlist
    }),
    [GET_POSTDATAINBOARDPIN]: (state, { payload }) => ({
      ...state,
      PostdataInBoardPin: payload.postdatainboardpin
    }),
    [GET_DETAIL]:(state,{payload})=>({
      ...state,
      DetailState:payload.detaildata
    }),
    [GET_FILE]:(state,{payload})=>({
      ...state,
      FileState:payload.filelist
    }),
    [GET_COMMENT]:(state,{payload})=>({
      ...state,
      CommentState:payload.commentlist
    }),
    [GET_ALLLOW]:(state,{payload})=>({
      ...state,
      AllLowState:payload.alllowlist
    })

  },
  initialState
);

// 콘솔 로그를 통해 상태 및 리듀서 확인 : 이다정 주석처리
// console.log("postReducer", postReducer);
// console.log("initialState.Postdata", initialState.Postdata);
// console.log("initialState.BoardState", initialState.BoardState);
// console.log("initialState.LowBoardState", initialState.LowBoardState);
// console.log("initialState.SoftListState",initialState.SortListState);
// console.log("initialState.PostdataInBoard",initialState.PostdataInBoard);
// console.log("initialState.PostdataInBoardPin",initialState.PostdataInBoardPin);
// console.log("initialState.AllLowState",initialState.AllLowState);


export default postReducer;
