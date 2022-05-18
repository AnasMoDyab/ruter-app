import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../redux/reducers/compbine';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;