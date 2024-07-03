import { request } from './api';
import { getDepartments, getDeptEmployees, getMyInfo, getRecordcard, getDeptDetail, success, getTeamRecordcard, registEmployees, getTitles, getPositions } from '../modules/EmployeeModules';

export const callDepartmentEmployeesAPI = () => {

    return async (dispatch, getState) => {

        try{
            const result = await request('GET', '/employee/employeeList', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('callDepartmentEmployeesAPI result : ', result);

            if(result && result.status === 200) {

                dispatch(getDeptEmployees(result.data));
                
            } else {
                console.error('팀원 정보 조회 실패 : ', result);
            }
        } catch (error) {
            console.error('팀원 정보 조회 실패 : ', error);
        }
    };
};

export const callMyInfoAPI = () => {

    return async (dispatch, getState) => {

        try {
            const result = await request('GET', '/employee/myInfo', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });
            // 이다정: 주석처리
            // console.log('callMyInfoAPI result : ', result);

            if(result && result.status === 200) {

                dispatch(getMyInfo(result.data));
            } else {
                console.log('내정보 조회 실패 result : ', result);
            }
        } catch (error) {
            console.log('내정보 조회 실패 error : ', error);
        }
    };
};


export const callRecordCardAPI = () => {

    return async (dispatch, getState) => {

        try {
            const result = await request('GET', '/employee/recordCard', {
                'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                'Content-Type': 'application/json'
            });

            console.log('callRecordCardAPI result: ', result);

            if(result && result.status === 200) {
                
                console.log('Dispatching getRecordCard with data: ', result.data); // 디버깅용 로그

                dispatch(getRecordcard(result.data));

            } else {

                console.log('인사기록카드 조회 실패(result)', result);

            }
        } catch(error) {

            console.error('인사기록카드 조회 실패(error)', error)
        }
    };
};

// 부서 전체 단순 조회 : 이다정
export const callsimpleDeptsAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request('GET', '/employee/simpleDepts',);

            if(result && result.status === 200) {
                dispatch(getDepartments(result.data));
            } else {
                console.log('부서 전체 단순 조회 실패(result): ', result);
            }
        } catch(error) {
            console.error('부서 전체 단순 조회 실패(error): ', error);
        }
    };
}

export const callDepartmentsAPI = () => {
 
    return async (dispatch, getState) => {

        try {
            const result = await request('GET', '/employee/departments',);

            // console.log('callDepartmentsAPI result: ', result);

            if(result && result.status === 200) {

                // console.log('Dispatching getDepartments with data: ', result.data);

                dispatch(getDepartments(result.data));

            } else {

                console.log('부서목록 조회 실패(result): ', result);
            }
        } catch(error) {
            console.error('부서목록 조회 실패(error): ', error);
        }
    };
};

export const callDeptDetailAPI = (deptCode) => { 

    return async ( dispatch, getState) => {

        try {
            const result = await request('GET', `/employee/deptDetailList/${deptCode}`);

            console.log('callDeptDetailAPI result: ', result);

            if(result && result.status === 200) {

                console.log('Dispatching getDeptDetail with data: ', result.data);

                dispatch(getDeptDetail(result.data));

            } else {

                console.log('부서상세 조회 실패(result): ', result);
            }
        } catch(error) {
            console.error('부서상세 조회 실패(error): ', error);
        }
    };
};

export const callRegistDeptAPI = (deptTitle) => {

    return async (dispatch, getState) => {
        try{
            const accessToken = localStorage.getItem('access-token');
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            };

            const requestData = {
                dept_title: deptTitle // 부서 제목을 요청 데이터에 추가
            };

            const result = await request('POST', `/employee/registDept`, headers, requestData);
            
            console.log('callRegistDeptAPI : ', result);
    
            if(result && result.status === 201) {
    
                dispatch(success());
                dispatch(callDepartmentsAPI()); // 부서 등록 성공 후에 부서 목록 다시 가져오기
            }
        } catch (error) {
            console.error('부서 등록 실패 : ', error)
        }
    };
};

export const callRegistDeptRelationsAPI = (parentDeptCode, subDeptCode) => {

    return async (dispatch, getState) => {
        try {
            const accessToken = localStorage.getItem('access-token');
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            };

            const requestData = {
                parentDepartment: { dept_code: parentDeptCode },
                subDepartment: { dept_code: subDeptCode }
            };

            const result = await request('POST', `/employee/registDeptRelations`, headers, requestData);

            console.log('callRegistDeptRelationsAPI : ', result);

            if(result && result.status === 201) {

                dispatch(success());
                dispatch(callDepartmentsAPI());
            }
        } catch (error) {
            console.error('부서관계 등록 실패 : ', error)
        }
    };
};

export const callDeleteDeptRelationsAPI = (parentDeptCode, subDeptCode) => {

    return async (dispatch, getState) => {
        try {
            const accessToken = localStorage.getItem('access-token');
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            };

            const requestData = {
                parentDepartment: { dept_code: parentDeptCode },
                subDepartment: { dept_code: subDeptCode }
            };

            const result = await request('DELETE', `/employee/deleteDeptRelations`, headers, requestData);

            console.log('callDeleteDeptRelationsAPI : ', result);

            if (result && result.status === 204) {
                
                dispatch(success());
                dispatch(callDepartmentsAPI());
            }
        } catch(error) {
            console.error('부서관계 삭제 실패', error)
        }
    };
};

export const callModifyDeptRelationsAPI = (parentDeptCode, subDeptCode, deptRelationsCode) => {

    return async (dispatch, getState) => {
        try {
            const accessToken = localStorage.getItem('access-token');
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            };

            const requestData = {
                parentDepartment: { dept_code: parentDeptCode },
                subDepartment: { dept_code: subDeptCode }
            };

            const result = await request('PUT', `/employee/modifyDeptRelations/${deptRelationsCode}`, headers, requestData);

            console.log('callModifyDeptRelationsAPI : ', result);

            if(result && result.status === 201) {

                dispatch(success(result.data));
                dispatch(callDepartmentsAPI());
                
            }
  
        } catch(error) {
            console.error('부서관계 수정 실패 : ', error)
        }
    };
};

export const callResetPasswordAPI = (empCode) => {

    return async (dispatch, getState) => {
        try {
            const accessToken = localStorage.getItem('access-token');
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            };

            const result = await request('PUT', `/employee/resetEmpPass/${empCode}`, headers);

            console.log('callResetPasswordAPI : ', result);

            if(result && result.status === 201) {

                console.log('Dispatching successResetPass with data: ', result.data);

                dispatch(success(result.data));
                // dispatch(callDepartmentEmployeesAPI());
            } else {
                console.log('비밀번호 초기화 실패(result)', result);
            }
        } catch (error) {
            console.error('비밀번호 초기화 실패(error) ', error);
        }
    };
};

export const callTeamRecordCardAPI = (empCode) => {

    return async (dispatch, getState) => {
        try {
            
            const accessToken = localStorage.getItem('access-token');
            
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            };
        
            const result = await request('GET', `/employee/teamRecordCard/${empCode}`, headers);

            console.log('callTeamRecordCardAPI : ', result);

            if(result && result.status === 200) {

                console.log('Dispatching getRecordcard with data: ', result);

                dispatch(getTeamRecordcard(result.data));

            } else {
                console.log('팀원 인사기록카드 조회 실패(result)', result)
            }
        } catch (error) {
            console.error('팀원 인사기록카드 조회 실패(eroor)', error)
        }      
    };
};

export const callRegistEmployeesAPI = (employeesData) => {
    return async (dispatch, getState) => {
        try {
            const accessToken = localStorage.getItem('access-token');
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            };

            console.log('Sending Payload employeesData:', employeesData);

            const result = await request('POST', '/employee/empsRegist', headers, employeesData); 

            console.log('callRegistEmployeeAPI result : ', result);

            if (result && result.status === 201) {
                console.log('사원 등록 성공:', result.data);
                dispatch(registEmployees(result.data)); // 등록 성공 시 리듀서에 액션 디스패치
                alert('사원이 성공적으로 등록되었습니다.');
            } else {
                console.log('사원 등록 실패:', result);
                alert('사원 등록 중 오류가 발생하였습니다. result');
            }
        } catch (error) {
            console.error('사원 등록 실패:', error);
            if (error.response) {
                console.error('Server Response:', error.response.data);
            }
            alert('사원 등록 중 오류가 발생하였습니다. error');
        }
    };
};

export const callTitlesAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request('GET', '/employee/empTitles',);

            if(result && result.status === 200) {

                dispatch(getTitles(result.data));

            } else {

                console.log('직위목록 조회 실패(result): ', result);
            }
        } catch(error) {
            console.error('직위목록 조회 실패(error): ', error);
        }
    }
}

export const callPositionsAPI = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request('GET', '/employee/empPositions',);

            if(result && result.status === 200) {

                dispatch(getPositions(result.data));

            } else {

                console.log('직급목록 조회 실패(result): ', result);
            }
        } catch(error) {
            console.error('직급목록 조회 실패(error): ', error);
        }
    }
}
