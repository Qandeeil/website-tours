import React , {useState,useEffect} from 'react';
import { getData , removeData } from '../store/Tours/Tours';
import { useSelector , useDispatch } from 'react-redux';
import Loading from './images/hzk6C.gif'
import { remove } from '../store/Tours/Tours';

const Tours = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData())
    } ,[])

    const {Tours} = useSelector(state => state)

    const [readMore,setReadMore] = useState(true)

    const readMoreHandler = () => {
        setReadMore(!readMore)
    }

    const showData = () => {
        return Tours.tours.map(({id,icon,name,salary,desc}) => {
            const textRead = readMore ? desc.slice(0,300) : desc 
            const res = desc.length > 300 ? (
                <div className='readMore'>
                    <p
                    className='desc'>{textRead}<span onClick={readMoreHandler}>
                    {readMore ? 'Read More' : 'Show Less'}</span>
                    </p>
                </div>
            ) : (
                <div>
                    <p className='desc'>{textRead}</p>
                </div>
            )
            return(
                <div className='element' key={id}>
                    <div className='image'>
                        <img src={icon}/>
                    </div>
                    <div className='text'>
                        <span className='title'>{name}</span>
                        <span className='salary'>${salary}</span>
                        {res}
                        <button onClick={() => dispatch(remove(id))}>Not Interested</button>
                    </div>
                </div>
            )
        })
    }

    return(
        <div className='OurTours'>
            <div className='header'>
                <h1>Our Tours</h1>
                <span className='line'></span>
                <img src={Tours.isLoading ? Loading : null}/>
            </div>
            <div className='content'>
                {Tours.isError ? <p style={{color: 'red',fontSize: '20px',
                                            textAlign: 'center',width: '100%',
                                            fontWeight: 'bold',width: '50%',margin: '1rem auto'}}>
                                            An error occurred while the server was running, please restart the site We apologize for this error
                                            </p> : null}
                {showData()}
                {showData().length ? null : <button className='refresh' onClick={() => window.location.reload()}>Refresh</button>}
            </div>
        </div>
    )
}
export default Tours;