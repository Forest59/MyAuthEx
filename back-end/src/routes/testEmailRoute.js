import { sendEmail } from '../util/sendEmail';

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) =>{
        try {
            await sendEmail({
                to: 'tadforest59+test1@gmail.com',
                from: 'tadforest59@gmail.com',
                subject: 'Test work ?',
                text: 'Probably yes...',
            });
            res.sendStatus(200);
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}