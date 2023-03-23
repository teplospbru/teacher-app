import React, { FC, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteProps, useParams, useNavigate,Navigate } from 'react-router-dom';
import { RootState, Dispatch } from '../../core/redux/store';
import { setForStudentStateWithHash } from '../../core/redux/actions';
import './HashRoute.scss';

/**
 * Компонент-обёртка, который проверяет, равен ли :id хэшу на сервере. Если такого хеша нет,
 * то перекинет на 404 страницу. Если есть, но в сторе такого хеша ещё нет, то запишет тест, соответствующий
 * этому хешу с стор. Если в сторе есть хеш и стор заполнен, но новый хеш из урла от него отличается, 
 * то перезапишет стор новым тестом.
 */
type TProps = {
    children: ReactNode;
  } & RouteProps;

export const HashRoute: FC<TProps> = ({children, ...rest}) => {
    const dispatch = useDispatch<Dispatch>();
    const navigate = useNavigate();
    const { hash } = useParams();
    const { hash: hashFromState, exercises } = useSelector((state: RootState) => state.forStudent.forStudent);

    useEffect(() => {
      const getState = async () => {
        if(hash) {
          if(exercises.length === 0 || hash !== hashFromState) {
            try {
              dispatch(setForStudentStateWithHash(hash));
            } catch (error) {
              return <Navigate to="/404" replace />;
            }
          }
        }
      };
  
      getState();
    }, [hash, dispatch, navigate, exercises.length, hashFromState]);

    if(!hash) {
      return <>{'Loading...'}</>
    }

    return <div {...rest}>{children}</div>
}