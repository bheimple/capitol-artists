export type Testimonial = {
  id: string;
  quote: string;
  excerpt?: string;
  author: string;
  role?: string;
  church: string;
  location: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "chris-heldt",
    quote:
      "I received my first call to host a Gospel group the week I arrived at Trinity as the new pastor. I had no idea what capabilities the church had, or how well attended a special event like this would be. Honestly, I was not sure our small church could host a concert like this, thinking only a large church with a top of the line audio and visual system could handle this type of event. Michael assured me that those details are all taken care of and even as a small church, we could make it happen. He was right and we have been able to host 3 groups in the 3 years I have been here. The process is simple, and each group has been easy to work with. The members of our church love the high quality music, and we are able to invite some new faces to the church as they see the advertisements about the special musical group who will be here. I was hesitant initially, but I am glad we said yes to the first group and look forward to additional opportunities in the future.",
    excerpt:
      "Michael assured me that those details are all taken care of and even as a small church, we could make it happen.",
    author: "Pastor Chris Heldt",
    church: "Trinity United Methodist Church",
    location: "Roseville, MI",
  },
  {
    id: "wayne-darty",
    quote:
      "Michael and I have worked together to get Christian artist to come to County Line Baptist Church and it has been such a blessing. He understands what I want and need for our community. He always works out the details! When you work with him, you’ll understand what I mean.",
    author: "Pastor Wayne Darty",
    church: "County Line Baptist Church",
    location: "Cumby, TX",
  },
  {
    id: "troy-guttormson",
    quote:
      "I have worked with Capitol Artists through Michael Heimple for several years now. Through his booking recommendations, we have had several high-quality gospel artists perform at our church, and our congregation has been greatly blessed by their music. I highly recommend Michael Heimple, Capitol Artists, and their amazing roster of talented musicians.",
    author: "Troy Guttormson",
    role: "Worship Pastor",
    church: "Walker Baptist Church",
    location: "Franklin, TN",
  },
  {
    id: "keith-brown",
    quote:
      "I want to take a minute and tell you of the relationship that I have developed with Michael Heimple of Capitol Artists. I have used Michael multiple times and I could not be more pleased with his service and dedication to detail. We had the bad luck of having an 8 inch snowfall on the weekend we had an artist booked and I realized that we would have to cancel the concert. I contacted Michael and he immediately got on the phone and worked out a solution for my church. I would not hesitate to call on him for any of my concert needs and I trust his judgement both musically and personally.",
    excerpt:
      "We had the bad luck of having an 8 inch snowfall on the weekend we had an artist booked and I realized that we would have to cancel the concert. I contacted Michael and he immediately got on the phone and worked out a solution for my church.",
    author: "Rev. V. Keith Brown",
    role: "Senior Pastor",
    church: "First Methodist Church Henderson",
    location: "Henderson, TN",
  },
];
