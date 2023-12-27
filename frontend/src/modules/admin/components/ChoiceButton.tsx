interface propTypes {
    choice: {
        id: number,
        name: string
    },
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export const ChoiceButton: React.FC<propTypes> = (props) => {

    const { choice, handleClick } = props
    return (
        <>
            <button onClick={handleClick} value={choice.id}>
                {choice.name}
            </button> 
        </>
    )
}