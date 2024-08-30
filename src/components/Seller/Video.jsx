

const Video = () => {
    return (
        <div className="w-full h-full">
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/O200gSqRpEE" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default Video;
