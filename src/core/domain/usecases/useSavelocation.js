import {useDispatch} from 'react-redux';
import { saveLocation } from '../../presentation/redux/actions';

export const useSaveLocation = () =>{
    const dispatch = useDispatch();
  
    const saveLocationRedux = obj =>{
        dispatch(saveLocation(obj))
    }

    return {
        saveLocationRedux
    }
}