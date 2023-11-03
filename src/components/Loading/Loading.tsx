interface Props {
    isLoading: boolean;
    showLoadingIndicator: boolean;
}

const Loading = ({ isLoading, showLoadingIndicator }: Props) => {
    return (
        <>
            {isLoading && showLoadingIndicator && (
                <div className="loading-indicator">
                    <div className="loading-spinner"></div>
                </div>
            )}
        </>
    );
};

export default Loading;
