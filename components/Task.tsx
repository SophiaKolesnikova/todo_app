interface TaskProps {
    title: string,
    email: string | null | undefined,
    isCompleted: boolean,
}

const Task = ({ title, email, isCompleted }: TaskProps) => {
    console.log(isCompleted);
    return (
        <div className='inputTaskInfo'>
            {isCompleted ? (<p>Completed</p>) : (<p>Incomplete</p>)}
            <p>{email}</p>
            <h3 className='inputTaskTitle'>{title}</h3>
        </div>
    );
};

export default Task;