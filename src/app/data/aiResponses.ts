export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Mock AI response generator
export function generateAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // SAT/ACT related
  if (lowerMessage.includes("sat") || lowerMessage.includes("act")) {
    return "Great question about standardized testing! Here's what you need to know:\n\n• **SAT scores** range from 400-1600. Most competitive schools look for 1400+\n• **ACT scores** range from 1-36. Top schools typically want 30+\n• Consider taking both tests to see which format suits you better\n• Plan to take the test 2-3 times for your best score\n• Many schools are now test-optional, but strong scores still help\n\nWould you like specific score recommendations for your target schools?";
  }

  // GPA related
  if (lowerMessage.includes("gpa")) {
    return "GPA is crucial for college admissions! Here's the breakdown:\n\n• **Unweighted GPA** (4.0 scale): Most competitive schools want 3.7+\n• **Weighted GPA**: Shows course rigor through AP/Honors classes\n• **Trend matters**: Upward trajectory is viewed positively\n• Take challenging courses while maintaining strong grades\n• Don't just focus on numbers - course selection matters\n\nWhat's your current GPA and what schools are you targeting?";
  }

  // Extracurriculars
  if (lowerMessage.includes("extracurricular") || lowerMessage.includes("activities") || lowerMessage.includes("ec")) {
    return "Extracurriculars are essential for standing out! Here's my advice:\n\n• **Quality over quantity** - Deep involvement in 2-3 activities beats superficial participation in 10\n• Show **leadership** and impact in your chosen areas\n• Demonstrate **passion** and long-term commitment\n• Connect activities to your intended major when possible\n• Include: clubs, sports, volunteering, work, research, or personal projects\n\nWhat are your main interests and passions?";
  }

  // Essays
  if (lowerMessage.includes("essay") || lowerMessage.includes("personal statement")) {
    return "College essays are your chance to show who you are beyond numbers! Tips:\n\n• **Be authentic** - Write in your own voice\n• **Show, don't tell** - Use specific examples and stories\n• **Focus on growth** - How have you changed or what did you learn?\n• **Be specific** - Generic essays don't stand out\n• **Get feedback** - But make sure it still sounds like you\n\nStart brainstorming unique stories or experiences that shaped you. What makes you different?";
  }

  // Letters of recommendation
  if (lowerMessage.includes("recommendation") || lowerMessage.includes("letter")) {
    return "Letters of recommendation can make a big difference! Here's how to get strong ones:\n\n• Ask teachers who **know you well** and can speak to your strengths\n• Ideally from junior year core subject teachers\n• Ask early (spring of junior year)\n• Provide a **resume** and information about why you're interested in specific schools\n• **Waive your right** to read them (shows authenticity)\n• Send thank you notes!\n\nHave you identified which teachers you'll ask?";
  }

  // Deadlines
  if (lowerMessage.includes("deadline") || lowerMessage.includes("when to apply")) {
    return "College application deadlines vary by type:\n\n• **Early Action (EA)**: Nov 1 - Dec 1 (non-binding, hear back early)\n• **Early Decision (ED)**: Nov 1 - Dec 1 (binding, can only apply to one)\n• **Regular Decision (RD)**: Jan 1 - Feb 1 (most common)\n• **Rolling Admission**: Applications reviewed as received\n\n**Pro tip**: Applying early often increases admission chances! I can show you specific deadlines for schools you're interested in.";
  }

  // Financial aid
  if (lowerMessage.includes("financial aid") || lowerMessage.includes("scholarship") || lowerMessage.includes("tuition") || lowerMessage.includes("cost")) {
    return "Paying for college is a major consideration! Here's what you should know:\n\n• File **FAFSA** (opens October 1st) for federal aid\n• Submit **CSS Profile** for institutional aid at private schools\n• Many top schools are **need-blind** and meet 100% of demonstrated need\n• Look for **merit scholarships** based on achievements\n• **Net Price Calculators** on school websites estimate actual cost\n\nDon't let sticker price discourage you - financial aid can make expensive schools affordable!";
  }

  // Major selection
  if (lowerMessage.includes("major") || lowerMessage.includes("undecided")) {
    return "Choosing a major can feel overwhelming, but here's what you should know:\n\n• It's **okay to be undecided**! Most students change majors anyway\n• Consider your **interests, strengths, and career goals**\n• Research which schools have strong programs in areas you're interested in\n• Some majors are more competitive to get into (like engineering or CS)\n• Liberal arts schools often make it easier to explore before declaring\n\nWhat subjects or career paths interest you most?";
  }

  // College visits
  if (lowerMessage.includes("visit") || lowerMessage.includes("campus tour")) {
    return "Campus visits are incredibly valuable! Here's how to make the most of them:\n\n• **Schedule official tours** and info sessions\n• **Sit in on a class** if possible\n• **Talk to current students** - they'll give you honest insights\n• **Explore the area** around campus\n• **Visit during the school year** to see campus when it's active\n• Take notes and photos to remember each school\n\nVirtual tours are also available if you can't visit in person. Which schools are you considering visiting?";
  }

  // Ivy League
  if (lowerMessage.includes("ivy league") || lowerMessage.includes("ivy")) {
    return "The Ivy League schools are highly selective, but here's what you should know:\n\n**The 8 Ivies**: Harvard, Yale, Princeton, Columbia, Penn, Dartmouth, Brown, Cornell\n\n• All have acceptance rates under 10%\n• Strong academics across all subjects\n• Excellent financial aid for those who qualify\n• **But remember**: Ivy isn't everything! Many non-Ivy schools offer equal or better programs in specific fields\n\nDon't fixate only on Ivies - build a balanced list with reach, target, and safety schools!";
  }

  // Application strategy
  if (lowerMessage.includes("how many") || lowerMessage.includes("apply")) {
    return "Building a balanced college list is crucial! Here's the strategy:\n\n• **2-3 Reach schools**: Acceptance rate <25% or your stats are below average\n• **3-4 Target schools**: Acceptance rate 25-50% and your stats match\n• **2-3 Safety schools**: Acceptance rate >50% and your stats exceed average\n\n**Total: 7-10 schools** is ideal. More than 15 becomes overwhelming!\n\nMake sure you'd be happy attending any school on your list. What's your profile like?";
  }

  // Start/begin
  if (lowerMessage.includes("start") || lowerMessage.includes("begin") || lowerMessage.includes("how do i")) {
    return "Great! Let's create a roadmap for your college admission journey:\n\n**Freshman/Sophomore Year:**\n• Focus on strong grades and course rigor\n• Explore extracurriculars and find your passions\n• Build relationships with teachers\n\n**Junior Year:**\n• Take SAT/ACT (start preparing now!)\n• Visit colleges if possible\n• Start essay brainstorming over summer\n\n**Senior Year (Fall):**\n• Finalize college list\n• Write essays and submit applications\n• Request recommendations\n\nWhat year are you currently in? I can give you specific next steps!";
  }

  // Hello/Hi
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi ") || lowerMessage === "hi" || lowerMessage === "hey") {
    return "Hello! I'm your Xylamia AI advisor, here to help you get into your dream college! 🎓\n\nI can help you with:\n• Building your college list\n• Understanding admissions requirements\n• SAT/ACT strategies\n• Essay guidance\n• Financial aid information\n• Application deadlines\n• And much more!\n\nWhat would you like to know about the college admission process?";
  }

  // Thank you
  if (lowerMessage.includes("thank")) {
    return "You're very welcome! I'm here to support you throughout your college admission journey. Feel free to ask me anything else!\n\nRemember: The key to successful applications is starting early and staying organized. You've got this! 💪";
  }

  // Default response
  return "That's a great question! While I can provide general guidance on college admissions, I'd be happy to help you with:\n\n• **College selection** - Finding schools that match your profile\n• **Test preparation** - SAT/ACT strategies and requirements\n• **Application timeline** - When to do what\n• **Essays** - How to write compelling personal statements\n• **Extracurriculars** - Building a strong activity profile\n• **Financial aid** - Understanding costs and scholarships\n\nCould you tell me more about your specific situation or concerns? What year are you in and what are your academic interests?";
}
