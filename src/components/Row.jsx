export default function Row({item,deleteTask}) {
    return (
        <li>
         {item.description}
         <button className='delete-button' onClick={() => deleteTask(item.id)}>Delete</button>
        </li>
    )
}

<ul>
    {
        tasks.map(item => (
            <Row item={item} key={item.id} deleteTask={deleteTask} />
        ))
    }
</ul>
