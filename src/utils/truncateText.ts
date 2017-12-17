const truncateText = (text) => {
    const maxTextLength = 65;
    const truncateSymbol = '...';

    if (text.length < maxTextLength) {
        return text;
    }

    const truncatedText = text.slice(0, maxTextLength).trim() + truncateSymbol;

    return truncatedText;
};

export default truncateText;