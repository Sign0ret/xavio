// server.js
import Course from './models/Courses';
import Message from './models/Messages';

export default (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        let courseId = null; // Initialize courseId

        const handleJoinCourse = async (id) => {
            courseId = id; // Set courseId when user joins course
            socket.join(courseId);
            console.log(`User joined course: ${courseId}`);

            await handleFetchMessages({ courseId, page: 1, limit: 10 });
        };

        const handleSaveMessage = async (message_data) => {
            //console.log(message_data);
            //console.log(courseId);
            try {
                const newMessage = new Message({
                    sender: message_data.sender,
                    message: message_data.message,
                    block: message_data.block
                });

                const updatedCourse = await Course.findByIdAndUpdate(
                    courseId,
                    { $push: { messages: newMessage } },
                    { new: true }
                );

                if (updatedCourse) {
                    io.to(courseId).emit('server:newMessage', newMessage);
                } else {
                    console.error('Course not found');
                }
            } catch (error) {
                console.error('Error saving message:', error);
            }
        };

        const handleUpdateMessage = async ({ messageId, message }) => {
            try {
                const course = await Course.findOneAndUpdate(
                    { _id: courseId, 'messages._id': messageId },
                    { $set: { 'messages.$.message': message } },
                    { new: true }
                );

                if (course) {
                    const updatedMessage = course.messages.id(messageId);
                    io.to(courseId).emit('server:messageUpdated', updatedMessage);
                } else {
                    console.error('Message or Course not found');
                }
            } catch (error) {
                console.error('Error updating message:', error);
            }
        };

        const handleDeleteMessage = async (messageId) => {
            try {
                const course = await Course.findByIdAndUpdate(
                    courseId,
                    { $pull: { messages: { _id: messageId } } },
                    { new: true }
                );

                if (course) {
                    io.to(courseId).emit('server:messageDeleted', messageId);
                } else {
                    console.error('Course not found');
                }
            } catch (error) {
                console.error('Error deleting message:', error);
            }
        };

        const handleFetchMessages = async ({ courseId, page = 1, limit = 10 }) => {
            try {
                const course = await Course.findById(courseId);
                if (course) {
                    const startIndex = (page - 1) * limit;
                    const paginatedMessages = course.messages
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort messages by creation date descending
                        .slice(startIndex, startIndex + limit)
                        .reverse(); // Reverse to maintain chronological order
                    console.log(paginatedMessages)
                    socket.emit('server:loadmessages', { messages: paginatedMessages, page });
                } else {
                    console.error('Course not found');
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        

        socket.on('joinCourse', handleJoinCourse);
        socket.on('client:saveMessage', handleSaveMessage);
        socket.on('client:updateMessage', handleUpdateMessage);
        socket.on('client:deleteMessage', handleDeleteMessage);
        socket.on('client:fetchMessages', handleFetchMessages);

        socket.on('disconnect', () => {
            console.log('A user disconnected');
            // Clean up event listeners if necessary
            socket.off('joinCourse', handleJoinCourse);
            socket.off('client:saveMessage', handleSaveMessage);
            socket.off('client:updateMessage', handleUpdateMessage);
            socket.off('client:deleteMessage', handleDeleteMessage);
            socket.off('client:fetchMessages', handleFetchMessages);
        });
    });
};
