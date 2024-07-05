import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGETReadyPost } from './postApi/PostAPI';
import { callDepartmentEmployeesAPI } from '../../apis/EmployeeAPICalls';

function PostReadyList() {
  const dispatch = useDispatch();
  const postState = useSelector(state => state.post);
  const { Postdata, PostSearch } = postState;

  const [postsearch, setpostSearch] = useState('');
  const [displayData, setDisplayData] = useState([]);
  const [empCode,setEmpCode]=useState('')

  useEffect(() => {
    dispatch(callDepartmentEmployeesAPI());
}, [dispatch]);
const employees = useSelector(state => state.employeeReducer.employees?.employees || []);

useEffect(() => {
    setEmpCode(employees.map(employee => (
      {
        emp_code: employee.emp_code,
      }
    )));
  }, [employees]);
  
  useEffect(() => {
    dispatch(callGETReadyPost(empCode.emp_code)); // 첫 번째 페이지, 페이지당 10개의 데이터 요청
  }, [dispatch]);

  useEffect(() => {
    setDisplayData(Postdata);
  }, [Postdata]);

  useEffect(() => {
    if (postsearch) {
      setDisplayData(PostSearch);
    } else {
      setDisplayData(Postdata);
    }
  }, [PostSearch, postsearch, Postdata]);

  const renderRows = () => {
    if (!Array.isArray(displayData) || displayData.length === 0) {
      return <tr><td colSpan="6">로딩 중...</td></tr>;
    }



    return displayData.map(item => {
      const lowBoardCode = item.lowBoardCode ? item.lowBoardCode.lowBoardCode : 'N/A';
      const lowBoardName = item.lowBoardCode ? item.lowBoardCode.lowBoardName : 'N/A';

      return (
        <tr key={item.postCode}>
          <td>{item.postCode}</td>
          <td>{lowBoardName}</td>
          <td>{item.postName}</td>
          <td>{item.empCode}</td>
          <td>{item.postDate}</td>
          <td>{item.postViewCnt}</td>
        </tr>
      );
    });
  };


  return (
    <>      
      <div className="main">
        <h1 style={{ fontSize: '50px' }}>임시 저장</h1>
        <br /><br /><br />
        <table className="bl_tb1">
          <thead>
            <tr className="tableHead">
              <th>No</th>
              <th>분류</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>열람</th>
            </tr>
          </thead>
          <tbody>
            {renderRows()}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PostReadyList;
