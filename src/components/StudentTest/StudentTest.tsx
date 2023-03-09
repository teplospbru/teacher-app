import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStateDoc } from "../../core/api/api";
import { setForStudentState } from "../../core/redux/actions";
import { Dispatch, RootState } from "../../core/redux/store";
// import { isExpiryDate } from "./expiryDate";
import './StudentTest.scss';

export const StudentTest = () => {
    const dispatch = useDispatch<Dispatch>();
    const { student, expiryDate } = useSelector((state: RootState) => state.forStudent.forStudent);
    const { hash } = useParams();
    const navigate = useNavigate();
    const [isNowExpiryDate, setNowExpiryDate] = useState(true);

    useEffect(() => {
        const getState = async () => {
            if(hash) {
                try {
                    const { text }  = await getStateDoc(hash);
                    const data = JSON.parse(text);
                    // console.log(data.forStudent)
                    dispatch(setForStudentState(data));
                    
                } catch(error) {
                    // console.log(error)
                    navigate("/404");
                }
            } else {
                navigate("/404");
            }
        }

        getState();   
    }, [hash, dispatch, navigate]);

    useEffect(() => {
        if(expiryDate) {
            const date = new Date();
            const expiry = new Date(expiryDate);
            
            if(date > expiry) {
                setNowExpiryDate(true)
            } else {
                setNowExpiryDate(false)
            }
        }
    }, [expiryDate])

    return expiryDate ? (
        <div className="for-student">
            { isNowExpiryDate
                ? (<><h2>Тестовое задание</h2>
                    <p>ФИО: {student}</p>
                    <p>Дата выполнения: {expiryDate} (просрочено)</p></>)
                : (<><h2>Тестовое задание</h2>
                    <p>ФИО: {student}</p>
                    <p>Дата выполнения: {expiryDate}</p>
                    <button className="quest__button" onClick={ () => (true) }>Пройти Тест</button></>) }
        </div>
    ) : null;
}