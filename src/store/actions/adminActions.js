import actionTypes from './actionTypes';
import {getAllCodeServices,createNewUserService,
    getAllUsers,deleteUserService,editUserService,getTopDoctorHomeService
,getAllDoctors,saveDetailDoctorService} from '../../services/userService';
import {toast} from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart =()=>{

    return async(dispatch,getState)=>{
        try{
            dispatch({type: actionTypes.FETCH_GENDER_START});
            let res = await getAllCodeServices('gender');
            if(res && res.errCode === 0){
               dispatch(fetchGenderSuccess(res.data));
            }else{
               dispatch(fetchGenderFailed());
            }
         }catch(e){
           dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error',e)
         }
    }
    
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart =()=>{

    return async(dispatch,getState)=>{
        try{
            let res = await getAllCodeServices('position');
            if(res && res.errCode === 0){
               dispatch(fetchPositionSuccess(res.data));
            }else{
               dispatch(fetchPositionFailed());
            }
         }catch(e){
           dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error',e)
         }
    }
    
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart =()=>{

    return async(dispatch,getState)=>{
        try{
            let res = await getAllCodeServices('role');
            if(res && res.errCode === 0){
               dispatch(fetchRoleSuccess(res.data));
            }else{
               dispatch(fetchRoleFailed());
            }
         }catch(e){
           dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error',e)
         }
    }
    
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser =(data)=>{
    return async(dispatch,getState)=>{
        try{
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                toast.success("CREATE A NEW USER SUCCESD!")
               dispatch(saveUserSuccess());
               dispatch(fetchAllUsersStart());
            }else{
               dispatch(saveUserFailed());
            }
         }catch(e){
           dispatch(saveUserFailed());
            console.log('saveUser error',e)
         }
    }
}

export const saveUserSuccess=()=>({
    type:actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed=()=>({
    type:actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart =()=>{

    return async(dispatch,getState)=>{
        try{
            let res = await getAllUsers("ALL");
            if(res && res.errCode === 0){
               dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }else{
               toast.error("FETCH ALL USER FAILDED!");
               dispatch(fetchAllUsersFailed());
            }
         }catch(e){
           dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersStart error',e)
         }
    }
    
}

export const fetchAllUsersSuccess = (Data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: Data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteAUser =(userId)=>{
    return async(dispatch,getState)=>{
        try{
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0){
               toast.success("DELETE THE USER SUCCESD!");
               dispatch(deleteUserSuccess());
               dispatch(fetchAllUsersStart());
            }else{
               toast.error("DELETE THE USER FAILDED!");
               dispatch(deleteUserFailed());
            }
         }catch(e){
           dispatch(deleteUserFailed());
            console.log('deleteUser error',e)
         }
    }
}

export const deleteUserSuccess=()=>({
    type:actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed=()=>({
    type:actionTypes.DELETE_USER_FAILED
})

export const editAUser =(data)=>{
    return async(dispatch,getState)=>{
        try{
            let res = await editUserService(data);
            if(res && res.errCode === 0){
               toast.success("UPDATE THE USER SUCCESD!");
               dispatch(editUserSuccess());
               dispatch(fetchAllUsersStart());
            }else{
               toast.error("UPDATE THE USER FAILDED!");
               dispatch(editUserFailed());
            }
         }catch(e){
           dispatch(editUserFailed());
            console.log('editUser error',e)
         }
    }
}

export const editUserSuccess=()=>({
    type:actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed=()=>({
    type:actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor=()=>{
    return async(dispatch,getState)=>{
        try{
            let res = await getTopDoctorHomeService('10');
            if(res && res.errCode===0){
                dispatch({
                    type:actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctor:res.data
                })
            }else{
                dispatch({
                    type:actionTypes.FETCH_TOP_DOCTORS_FAILED
                })
            }
         }catch(e){
            console.log('FETCH_TOP_DOCTORS_FAILED: ',e)
            dispatch({
                type:actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
         }
    }
}

export const fetchAllDoctors=()=>{
    return async(dispatch,getState)=>{
        try{
            let res = await getAllDoctors();
            if(res && res.errCode===0){
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr:res.data
                })
            }else{
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
         }catch(e){
            console.log('FETCH_ALL_DOCTORS_FAILED: ',e)
            dispatch({
                type:actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
         }
    }
}

export const saveDetailDoctors=(data)=>{
    return async(dispatch,getState)=>{
        try{
            let res = await saveDetailDoctorService(data);
            if(res && res.errCode===0){
                toast.success('SAVE DETAIL DOCTOR SUCCEED!')
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                    dataDr:res.data
                })
            }else{
                toast.error('SAVE DETAIL DOCTOR ERROR!')
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
         }catch(e){
            console.log('SAVE_DETAIL_DOCTOR_FAILED: ',e)
            dispatch({
                type:actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
         }
    }
}