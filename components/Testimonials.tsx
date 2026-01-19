export default function Testimonials() {
  const testimonials = [
    {
      name: 'Kiefer Aland',
      role: 'Machine Learning Engineer',
      content: 'I had the privilege of working with this developer, where they demonstrated a strong aptitude for learning and applying React web development skills. They have an impressive understanding of web technologies and consistently sought to enhance their coding skill set.',
    },
    {
      name: 'Pia Walcott',
      role: 'Software Developer',
      content: 'In the time I\'ve known them, they\'ve transformed into an outstanding developer. They\'re not one to settle for mediocrity; instead, they consistently push themselves to exceed expectations.',
    },
    {
      name: 'Joseph Pisani',
      role: 'IT Software Support',
      content: 'Having worked with them for about a year I have seen their growth as a developer. They are someone who will go above and beyond, communicating very well with the team.',
    },
    {
      name: 'Manuel Zarraga',
      role: 'Frontend Developer',
      content: 'Working with them has been a great experience from day one. They are a very complete developer, with a great emphasis on details and a great ability to solve problems that may arise.',
    },
  ]

  return (
    <>
      <h2>&gt;Testimonies</h2>
      <ul className="space-y-3">
        {testimonials.map((testimonial, index) => (
          <li key={index}>
            <div className="border-border border rounded-2xl p-6 space-y-3 bg-background/40">
              <div className="flex gap-x-4">
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <span className="text-muted-foreground text-xs">{testimonial.role}</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-6">{testimonial.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
