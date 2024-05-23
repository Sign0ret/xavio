export default async function Messages() {
    const fetchMessages = async () => {
        const res = await fetch('http://localhost:3000/api/messages');
        const messages = await res.json();
        console.log("messages:", messages);
        return messages;
    }
    const messages = await fetchMessages();
    console.log(messages);
    return (
        <div>
            <h1>Messages</h1>
            {messages.map((message: any) => (
                <div key={message._id} className="text-white">
                    <h2>{message.message}</h2>
                    <h2>{message.block}</h2>
                    <h2>{message.sender}</h2>
                </div>  
            ))}
        </div>
    )
}