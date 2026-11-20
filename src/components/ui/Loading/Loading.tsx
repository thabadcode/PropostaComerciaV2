import style from './Loading.module.css';

interface LoadingProps {
    text?: string;
}

export default function Loading({text}: LoadingProps) {
    return (
        <div className={style.Loading}>
            {text && <span className={style.LoadText}>{text}</span>}
            <div className={style.DotsContainer}>
                <div className={style.Dot}/>
                <div className={style.Dot}/>
                <div className={style.Dot}/>
            </div>
        </div>
    );
};