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
  {
    id: "jason-sinagra",
    quote:
      "As a pastor of two congregations, we work with Capitol Artists a couple times a year, and the audiences are often amazed at the level of talent we are able to bring into our church, thanks to Michael and Capitol Artists.",
    author: "Pastor Jason Sinagra",
    church: "Mt. Nebo Presbyterian Church\nThe Presbyterian Church of Prospect",
    location: "Prospect, PA",
  },
  {
    id: "don-mcconnaughhay",
    quote:
      "I am Pastor of Pidcoke Baptist Church for the past 16 years and have had the privilege of working with Mike Heimple and the gospel artists of Capital Artists several times. I have found their musical gospel concerts professional and spiritual, presenting the Good News of Jesus Christ. I recommend them to you for a morning or evening of praise and enjoyment.",
    author: "Pastor Don McConnaughhay",
    church: "Pidcoke Baptist Church",
    location: "Pidcoke, TX",
  },
  {
    id: "towanda-martin",
    quote:
      "A big shout out to Mike and Capitol Artists group. Mike is always a pleasure to work with and has brought us several great groups. Keep up the good work.",
    author: "Towanda Martin",
    role: "Pastor",
    church: "Agape Fellowship",
    location: "Ingleside, TX",
  },
  {
    id: "joel-crippen",
    quote:
      "Michael Heimple and Capitol Artists has been a great help with reaching out to and connecting with our community, by setting up some great Gospel music talent for worship concerts.",
    author: "Pastor Joel Crippen",
    church: "First Southern Baptist Church",
    location: "For Scott, KS",
  },
  {
    id: "doug-walker",
    quote:
      "Micheal, Thank You for helping me connect with Gospel music groups like the Emmaus Road Quartet, Sacred Harmony and Westward Road. Every year you reach out and make me aware of these wonderful Groups that are available for my church and community. Thank you.",
    author: "Pastor Doug Walker",
    church: "Wilmington Island Global Methodist",
    location: "Savannah, GA",
  },
  {
    id: "ken-kemble",
    quote:
      "We had Glory Way and the Common Bond Quartet come sing and minister at our church, and both concerts were a truly blessed time. The music was inspiring and the testimonies were encouraging. We believe it is good for a local church to offer uplifting, Christ-centered music to their congregation, as well as their community, because many people may go to a concert who might not otherwise hear about Jesus. Thank you Michael",
    author: "Pastor Ken Kemble",
    church: "Capac Bible Church",
    location: "Capac, MI",
  },
  {
    id: "bob-howard",
    quote:
      "Michael, just a quick note to say thank you for your help in our music program. It is a joy to work with a fellow servant of the LORD.",
    author: "Bob Howard",
    role: "Music Coordinator",
    church: "First Baptist Church of Boulougne",
    location: "Hillard, FL",
  },
];
