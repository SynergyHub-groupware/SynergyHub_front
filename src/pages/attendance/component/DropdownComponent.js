import React, { useState, useEffect } from 'react';

const DropdownComponent = ({ departmentsData, userRoleData, handleParentDeptChange, handleSubDeptChange, handleTeamChange }) => {
    const [parentDeptOptions, setParentDeptOptions] = useState([]);
    const [subDeptOptions, setSubDeptOptions] = useState([]);
    const [teamOptions, setTeamOptions] = useState([]);

    useEffect(() => {
        if (userRoleData.empTitle === 'T2' && userRoleData.deptCode === 'D2') {
            // T2, D2에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '전략기획부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const allSubDepts = parentDept.subDepartments;
                setSubDeptOptions(allSubDepts);
                const allTeams = allSubDepts.reduce((teams, subDep) => [...teams, ...subDep.teams], []);
                setTeamOptions(allTeams);
            }
        } else if (userRoleData.empTitle === 'T2' && userRoleData.deptCode === 'D3') {
            // T2, D3에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '경영지원부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const allSubDepts = parentDept.subDepartments;
                setSubDeptOptions(allSubDepts);
                const allTeams = allSubDepts.reduce((teams, subDep) => [...teams, ...subDep.teams], []);
                setTeamOptions(allTeams);
            }
        } else if (userRoleData.empTitle === 'T4' && userRoleData.deptCode === 'D7') {
            // T4, D7에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '전략기획부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const subDept = parentDept.subDepartments.find(subDep => subDep.name === '영업부');
                if (subDept) {
                    setSubDeptOptions([subDept]);
                    const teamOptions = subDept.teams.filter(team => team === '영업기획팀' || team === '고객관리팀');
                    setTeamOptions(teamOptions);
                }
            }
        } else if (userRoleData.empTitle === 'T4' && userRoleData.deptCode === 'D10') {
            // T4, D10에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '전략기획부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const subDept = parentDept.subDepartments.find(subDep => subDep.name === '마케팅부');
                if (subDept) {
                    setSubDeptOptions([subDept]);
                    const teamOptions = subDept.teams;
                    setTeamOptions(teamOptions);
                }
            }
        } else if (userRoleData.empTitle === 'T4' && userRoleData.deptCode === 'D4') {
            // T4, D10에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '경영지원부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const subDept = parentDept.subDepartments.find(subDep => subDep.name === '인사부');
                if (subDept) {
                    setSubDeptOptions([subDept]);
                    const teamOptions = subDept.teams;
                    setTeamOptions(teamOptions);
                }
            }
        } else if (userRoleData.empTitle === 'T4' && userRoleData.deptCode === 'D13') {
            // T4, D10에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '경영지원부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const subDept = parentDept.subDepartments.find(subDep => subDep.name === '정보기술부');
                if (subDept) {
                    setSubDeptOptions([subDept]);
                    const teamOptions = subDept.teams;
                    setTeamOptions(teamOptions);
                }
            }
        } else if (userRoleData.empTitle === 'T5' && userRoleData.deptCode === 'D8') {
            // T5, D8에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '전략기획부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const subDept = parentDept.subDepartments.find(subDep => subDep.name === '영업부');
                if (subDept) {
                    setSubDeptOptions([subDept]);
                    const teamOptions = subDept.teams.filter(team => team === '영업기획팀');
                    setTeamOptions(teamOptions);
                }
            }
        } else if (userRoleData.empTitle === 'T5' && userRoleData.deptCode === 'D9') {
            // T5, D8에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '전략기획부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const subDept = parentDept.subDepartments.find(subDep => subDep.name === '영업부');
                if (subDept) {
                    setSubDeptOptions([subDept]);
                    const teamOptions = subDept.teams.filter(team => team === '고객관리팀');
                    setTeamOptions(teamOptions);
                }
            }
        } else if (userRoleData.empTitle === 'T5' && userRoleData.deptCode === 'D10') {
            // T5, D8에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '전략기획부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const subDept = parentDept.subDepartments.find(subDep => subDep.name === '마케팅부');
                if (subDept) {
                    setSubDeptOptions([subDept]);
                    const teamOptions = subDept.teams.filter(team => team === '브랜드관리팀');
                    setTeamOptions(teamOptions);
                }
            }
        } else if (userRoleData.empTitle === 'T5' && userRoleData.deptCode === 'D11') {
            // T5, D8에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '전략기획부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const subDept = parentDept.subDepartments.find(subDep => subDep.name === '마케팅부');
                if (subDept) {
                    setSubDeptOptions([subDept]);
                    const teamOptions = subDept.teams.filter(team => team === '디지털마케팅팀');
                    setTeamOptions(teamOptions);
                }
            }
        } else if (userRoleData.empTitle === 'T5' && userRoleData.deptCode === 'D5') {
            // T5, D8에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '경영지원부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const subDept = parentDept.subDepartments.find(subDep => subDep.name === '인사부');
                if (subDept) {
                    setSubDeptOptions([subDept]);
                    const teamOptions = subDept.teams.filter(team => team === '채용팀');
                    setTeamOptions(teamOptions);
                }
            }
        } else if (userRoleData.empTitle === 'T5' && userRoleData.deptCode === 'D6') {
            // T5, D8에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '경영지원부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const subDept = parentDept.subDepartments.find(subDep => subDep.name === '인사부');
                if (subDept) {
                    setSubDeptOptions([subDept]);
                    const teamOptions = subDept.teams.filter(team => team === '교육개발팀');
                    setTeamOptions(teamOptions);
                }
            }
        } else if (userRoleData.empTitle === 'T5' && userRoleData.deptCode === 'D14') {
            // T5, D8에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '경영지원부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const subDept = parentDept.subDepartments.find(subDep => subDep.name === '정보기술부');
                if (subDept) {
                    setSubDeptOptions([subDept]);
                    const teamOptions = subDept.teams.filter(team => team === '시스템개발팀');
                    setTeamOptions(teamOptions);
                }
            }
        } else if (userRoleData.empTitle === 'T5' && userRoleData.deptCode === 'D15') {
            // T5, D8에 대한 설정
            const parentDept = departmentsData.find(dep => dep.name === '경영지원부');
            if (parentDept) {
                setParentDeptOptions([parentDept]);
                const subDept = parentDept.subDepartments.find(subDep => subDep.name === '정보기술부');
                if (subDept) {
                    setSubDeptOptions([subDept]);
                    const teamOptions = subDept.teams.filter(team => team === '정보보안팀');
                    setTeamOptions(teamOptions);
                }
            }
        }
    }, [departmentsData, userRoleData]);

    return (
        <>
            <select value={parentDeptOptions.length > 0 ? parentDeptOptions[0].name : ''} onChange={handleParentDeptChange} className="hp_mr5">
                <option value="">상위부서명</option>
                {parentDeptOptions.map(dep => (
                    <option key={dep.name} value={dep.name}>{dep.name}</option>
                ))}
            </select>
            <select value={subDeptOptions.length > 0 ? subDeptOptions[0]?.name : ''} onChange={handleSubDeptChange} className="hp_mr5">
                <option value="">하위부서명</option>
                {subDeptOptions.map(subDep => (
                    <option key={subDep.name} value={subDep.name}>{subDep.name}</option>
                ))}
            </select>
            <select onChange={handleTeamChange} className="hp_mr10">
                <option value="">팀명</option>
                {teamOptions.map(team => (
                    <option key={team} value={team}>{team}</option>
                ))}
            </select>
        </>
    );
};

export default DropdownComponent;
