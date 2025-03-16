import { Component, OnInit } from '@angular/core';
import { GeminiService } from '../gemini.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  school: string = '';
  prompt: string = '';
  jsonResponse: any = null;
  textResponse: string = '';
  loading: boolean = false;
  adviceType: string = 'positive';
  topic: string = 'scholarships';
  premadResponse: string = '';
  scholarships: any[] = [];

  categorizedInterests: { name: string, interests: string[] }[] = [
    { name: 'Hobbies', interests: ['Reading', 'Gaming', 'Cooking', 'Gardening', 'DIY Projects', 'Crafts'] },
    { name: 'Activities', interests: ['Sports', 'Travel', 'Fitness', 'Volunteering', 'Outdoor Adventures', 'Music Festivals'] },
    { name: 'Art & Culture', interests: ['Music', 'Art', 'Photography', 'Theater', 'Dance', 'Literature'] },
    { name: 'Technology', interests: ['Technology', 'Programming', 'Robotics', 'AI', 'Web Development'] },
    { name: 'College Life', interests: ['Campus Events', 'Student Organizations', 'Academic Clubs', 'Study Groups', 'Networking Events', 'Career Services'] },
    { name: 'Academic Interests', interests: ['STEM', 'Humanities', 'Social Sciences', 'Business', 'Health Sciences', 'Arts'] },
    { name: 'Campus Resources', interests: ['Library', 'Academic Advising', 'Counseling Services', 'Fitness Center', 'Dining Options', 'Student Housing'] },
    { name: 'High School Activities', interests: ['Sports Teams', 'Debate Club', 'Student Government', 'Academic Competitions', 'Band', 'Drama Club'] },
    { name: 'College Prep', interests: ['SAT/ACT Prep', 'College Applications', 'Scholarship Searches', 'Interview Skills', 'Extracurriculars', 'Letters of Recommendation'] },
    { name: 'Youth Programs', interests: ['Summer Camps', 'Leadership Programs', 'Mentorship', 'Community Service', 'Internships', 'Workshops'] },
    { name: 'Cultural Interests', interests: ['Cultural Festivals', 'Heritage Celebrations', 'Language Learning', 'Traditional Arts', 'Cultural Workshops', 'Community Gatherings'] },
    { name: 'Support Networks', interests: ['Mentorship Programs', 'Scholarship Opportunities', 'Networking Events', 'Support Groups', 'Cultural Associations'] },
    { name: 'Diversity & Inclusion', interests: ['Diversity Initiatives', 'Inclusion Workshops', 'Cultural Awareness Training', 'Anti-Racism Education', 'Equity Programs', 'Community Advocacy'] }
  ];
  selectedInterests: string[] = [];

  // To track collapsed categories (all collapsed initially)
  collapsedCategories: string[] = this.categorizedInterests.map(c => c.name);

  ngOnInit(): void {
    // Check if localStorage is available
    if (typeof localStorage !== 'undefined') {
      const storedInterests = localStorage.getItem('selectedInterests');
      if (storedInterests) {
        this.selectedInterests = JSON.parse(storedInterests);
      }
    }
  }

  handleInterestChange(event: any, interest: string) {
    if (event.target.checked) {
      this.selectedInterests.push(interest);
    } else {
      const index = this.selectedInterests.indexOf(interest);
      if (index > -1) {
        this.selectedInterests.splice(index, 1);
      }
    }
    // Persist to localStorage if available
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('selectedInterests', JSON.stringify(this.selectedInterests));
    }
  }
  

  // Toggle category collapse state
  toggleCategory(categoryName: string): void {
    const index = this.collapsedCategories.indexOf(categoryName);
    if (index > -1) {
      // Expand category by removing it from collapsedCategories
      this.collapsedCategories.splice(index, 1);
    } else {
      // Collapse category by adding it
      this.collapsedCategories.push(categoryName);
    }
  }

  // Helper function to check if a category is collapsed
  isCollapsed(categoryName: string): boolean {
    return this.collapsedCategories.includes(categoryName);
  }

  sendInterestData() {
    if (this.selectedInterests.length === 0) {
      alert('Please select at least one interest.');
      return;
    }

    const prompt = `"Please find scholarships related to ${this.selectedInterests.join(', ')} for students planning to attend ${this.school}. Return only valid JSON, without any additional text or commentary, in the following format:

{
  "scholarships": [
    {
      "name": "Scholarship Name",
      "requirements": "Eligibility requirements and criteria for the scholarship.",
      "application_deadline": "Application deadline date."
    }
  ]
}

Make sure the information is up-to-date and includes working links to the application or official websites.
`;
    this.sendPremadeData(prompt);
  }

  async sendPremadeData(premadePrompt?: string) {
    const promptToSend = premadePrompt || this.prompt;
    if (promptToSend) {
      this.loading = true;
      this.premadResponse = '';
      try {
        let responseText = await this.geminiService.generatePreMadeText(promptToSend);
        console.log("Raw API Response:", responseText);

        // Remove markdown code block markers if present
        if (responseText.startsWith("```")) {
          responseText = responseText.replace(/^```[^\n]*\n/, "").replace(/\n```$/, "").trim();
        }

        // Attempt to parse the cleaned responseText
        try {
          const parsed = JSON.parse(responseText);
          if (parsed.scholarships && Array.isArray(parsed.scholarships)) {
            this.scholarships = parsed.scholarships;
          } else {
            console.error("Parsed JSON does not contain a valid scholarships array.");
            this.scholarships = [];
          }
        } catch (jsonError) {
          console.error("Error parsing JSON:", jsonError);
          this.scholarships = [];
        }
        this.premadResponse = responseText;
      } catch (error) {
        console.error("Error calling Gemini API:", error);
      }
      this.loading = false;
    }
  }

  constructor(private geminiService: GeminiService) { }
}
