import cron from "node-cron";
import { CaseModel } from "../../data/models/case.model";
import { EmailService } from "../services/email.service";
import { generateEmailTemplate } from "../templates/email.template";

export const emailJob = () => {
    const emailService = new EmailService();

    cron.schedule("*/10 * * * * *", async () => {
        try {
            const cases = await CaseModel.find({
                isSent: false
            });
            if (!cases.length) {
                console.log("No hay casos para enviar");
                return;
            }

            console.log(`Casos para enviar: ${cases.length}`);
            await Promise.all(
                cases.map(async (c) => {
                    try {
                        const emailSent = await emailService.sendMail({
                            to: "luis03enriquez86@gmail.com",
                            subject: "Nuevo Caso Registrado",
                            body: generateEmailTemplate(c.genre, c.age, c.lat, c.lng)
                        });

                        console.log(`Correo enviado: ${c._id}`);

                        await CaseModel.updateOne({ _id: c._id }, {
                            isSent: true
                        });
                    } catch (error) {
                        console.error(error);
                    }
                })
            );
        } catch (error) {
            console.error(error);
        }
    });
};