export interface KnowledgeChunk {
  id: string;
  title: string;
  content: string;
  url: string;
}

export const knowledgeBase: KnowledgeChunk[] = [
  // Business Info
  {
    id: "business-info",
    title: "The Sports Pod - Business Information",
    content: "Name: The Sports Pod — Sports Rehab Redefined. Location: 4302 West Lovers Lane, Dallas, TX 75209. Phone: (214) 888-6769. Email: info@thesportspod.co. Booking: https://airtable.com/appofhO24o8DXcD75/pagrE6jeIGbrwnYCO/form",
    url: "https://www.thesportspod.co/"
  },
  // About & Philosophy
  {
    id: "about_philosophy",
    title: "About The Sports Pod & Mission",
    content: "The Sports Pod is a fully integrated performance center that bridges the gap between rehab and performance. Our mission is 'Movement Drives Us.' We serve athletes, weekend warriors, and active families by blending cutting-edge clinical treatment with strength-forward programming. Our approach starts with a Movement Chain Assessment to find the root cause of pain, followed by personalized plans involving dry needling, soft-tissue therapy, and strength coaching.",
    url: "https://www.thesportspod.co/about"
  },
  // Team
  {
    id: "team_overview",
    title: "Our Team at The Sports Pod",
    content: "The Sports Pod team is a close-knit, multi-disciplinary group of experts led by Dr. Blake Wu (Founder & Clinical Director) and Eric Rosenstock (Strength & Rehab Coach). While we have a collaborative network of professionals, our core leadership and clinical expertise come from Dr. Wu and Coach Eric.",
    url: "https://www.thesportspod.co/team"
  },
  {
    id: "team_blake_wu",
    title: "Dr. Blake Wu — Founder & Clinical Director",
    content: "Dr. Blake Wu is the Founder and Clinical Director. He has over 15 years of experience treating elite athletes across the NBA, NHL, NFL, and PGA. He specializes in sports chiropractic and movement-based recovery.",
    url: "https://www.thesportspod.co/team"
  },
  {
    id: "team_coach_eric",
    title: "Eric Rosenstock — Strength & Rehab Coach",
    content: "Eric Rosenstock is a Strength & Conditioning Coach and expert in functional movement. As the owner of CrossFit Deep, he integrates strength training with clinical rehabilitation to help patients achieve lasting structural change and peak performance.",
    url: "https://www.thesportspod.co/team"
  },
  // Services
  {
    id: "service_chiropractic",
    title: "Service: Sports Chiropractic",
    content: "Sports Chiropractic at The Sports Pod goes beyond simple adjustments. We use trigger point therapy, dry needling, and specific rehab exercises to address the root cause of pain and enhance athletic performance through movement analysis.",
    url: "https://www.thesportspod.co/sports-chiropractic"
  },
  {
    id: "service_strength",
    title: "Service: Strength Training & Rehab",
    content: "Our strength-forward rehab addresses pain caused by instability, mobility restrictions, or muscular imbalance. We focus on performance-based training to create lasting structural changes rather than just temporary relief.",
    url: "https://www.thesportspod.co/strengthtraining"
  },
  {
    id: "service_dry_needling",
    title: "Service: Dry Needling Therapy",
    content: "Rooted in Western orthopedic medicine, our dry needling therapy targets dysfunctional muscles and trigger points. It reduces pain, restores range of motion, and accelerates recovery by improving blood flow and releasing muscular tension.",
    url: "https://www.thesportspod.co/dry-needling"
  },
  {
    id: "service-performance",
    title: "Service: Custom Performance Plans",
    content: "We create performance plans tailored specifically to your sport, body, and personal goals, ensuring a seamless transition from rehab back to competition.",
    url: "https://www.thesportspod.co/services"
  },
  {
    id: "service-prevention",
    title: "Service: Injury Prevention Programs",
    content: "Our injury prevention programs identify and address physical weaknesses before they lead to injury, keeping you performing at your best.",
    url: "https://www.thesportspod.co/services"
  },
  // Conditions
  {
    id: "conditions_approach",
    title: "Conditions We Treat",
    content: "We treat Back, Knee, Elbow, Shoulder, Hip, Neck, and Foot/Ankle pain, as well as sprains, strains, and concussions. Our core approach is the 'Movement Chain Assessment,' recognizing that pain in one area (like the knee) is often caused by compensations in another (like the hip).",
    url: "https://www.thesportspod.co/back-pain"
  },
  // FAQs
  {
    id: "faq_general",
    title: "FAQ: What is The Sports Pod?",
    content: "Q: What is The Sports Pod? A: We are a performance and recovery clinic specializing in athlete care. We combine sports medicine, chiropractic care, strength training, and rehab under one roof to help you move better and perform higher.",
    url: "https://www.thesportspod.co/faq"
  },
  {
    id: "faq_assessment",
    title: "FAQ: How do you create personalized plans?",
    content: "Q: How do you create personalized treatment plans? A: Every patient starts with an in-depth movement assessment to identify specific patterns, weaknesses, and the root cause of their injury.",
    url: "https://www.thesportspod.co/faq"
  },
  {
    id: "faq_booking",
    title: "FAQ: How do I book?",
    content: "Q: How do I book? A: You can book online via our Airtable form or call us directly at (214) 888-6769. We recommend a consultation for all new patients to establish a baseline.",
    url: "https://www.thesportspod.co/faq"
  },
  {
    id: "faq_athlete_only",
    title: "FAQ: Do you only treat pro athletes?",
    content: "Q: Do you only treat pro athletes? A: No! We treat everyone from professional athletes to weekend warriors and active families who want to recover, perform, and thrive.",
    url: "https://www.thesportspod.co/faq"
  }
];
