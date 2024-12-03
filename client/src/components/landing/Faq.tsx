import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FAQData = [
    {
        question: "How can I create a roadmap?",
        answer: "To create a roadmap, simply sign up for an account on our platform. Once you’re logged in, you can start outlining your goals and skills you want to develop. After you finish, your roadmap will be reviewed by our admin and technical team."
    },
    {
        question: "Can anyone become a mentor?",
        answer: "Yes, anyone can become a mentor if they are a working professional or have relevant skills. However, you must pass an assessment test with a score of at least 80% to qualify as a mentor."
    },
    {
        question: "Can I book a 1:1 session with a mentor?",
        answer: "Yes, you can book a 1:1 mentorship session with available mentors based on their skill and availability. This helps you get personalized guidance for your roadmap."
    },
    {
        question: "Are payment refunds available?",
        answer: "Currently, all payments are non-refundable. However, if you have any concerns or issues, please feel free to reach out to us at admin@gmail.com, and we will do our best to assist you."
    },
    {
        question: "How long does it take to get my roadmap approved?",
        answer: "The approval time for your roadmap may vary depending on the number of submissions we receive. Generally, it takes about 3-5 business days for our technical team to review and provide feedback."
    },
    {
        question: "How do I know if my roadmap is public?",
        answer: "Once your roadmap is approved by the admin and technical team, you will receive a notification. At that point, it will be visible to other users on the platform."
    },
    {
        question: " What should I do if I encounter technical issues on the platform?",
        answer: "If you face any technical issues while using the platform, please contact our support team at admin@gmail.com with details about the problem. We’ll help resolve it as quickly as possible."
    }
];

export function FAQAccordion() {
    return (
        <div className="w-full   max-w-[80%] mx-auto">
            <h2 className=' text-4xl mb-6 text-center'>
                Frequently Asked Questions <br/> 
            </h2>
            <Accordion type="single" collapsible >
                {FAQData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default FAQAccordion;