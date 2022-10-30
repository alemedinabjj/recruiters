const EnviaMail = import.meta.env.VITE_API_ENVIAMAIL;

const sendEmail = async (values: any, user: any) => {
  const response = await fetch("https://enviamail.herokuapp.com/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": EnviaMail,
    },

    body: JSON.stringify({
      ToEmail: values.email,
      Subject: `Parabéns ${values.name}, sua entrevista foi agendada com sucesso!`,
      Message: `Olá ${values.name}, seu agendamento foi realizado com sucesso! <br />
        Segue abaixo os dados do seu agendamento:
        <br />
        Data: ${values.date}
        Horário: ${values.time}
        <br />

        <br />
        <br />

        ${values.message}
        Boa sorte!

        Att, <br />
        ${user.name}          
        `,
    }),
  });
};

export default sendEmail;
