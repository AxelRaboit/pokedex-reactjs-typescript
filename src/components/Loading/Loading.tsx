import style from "./Loading.module.css";

interface Props {
    isLoading: boolean;
    showLoadingIndicator: boolean;
}

const Loading = ({ isLoading, showLoadingIndicator }: Props) => {
    return (
        <>
            {isLoading && showLoadingIndicator && (
                <div className={style.loadingIndicator}>
                    <div className={style.loadingSpinner}></div>
                </div>
            )}
        </>
    );
};

export default Loading;
