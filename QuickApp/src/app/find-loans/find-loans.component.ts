import { Component } from '@angular/core';
import { GeminiService } from '../gemini.service';

@Component({
  selector: 'app-find-loans',
  templateUrl: './find-loans.component.html',
  styleUrl: './find-loans.component.css'
})
export class FindLoansComponent {
  school: string = '';
    prompt: string = '';
    jsonResponse: any = null;
    textResponse: string = '';
    loading: boolean = false;
    adviceType: string = 'positive';
    topic: string = 'scholarships';
    premadResponse: string = '';
    grants: any[] = [];
  
    categorizedGrantInterests: { name: string, interests: string[] }[] = [
      { name: 'Hobbies', interests: ['Reading', 'Gaming', 'Cooking', 'Gardening', 'DIY Projects', 'Crafts'] },
      { name: 'Activities', interests: ['Sports', 'Travel', 'Fitness', 'Volunteering', 'Outdoor Adventures', 'Music Festivals'] },
      { name: 'Art & Culture', interests: ['Music', 'Art', 'Photography', 'Theater', 'Dance', 'Literature'] },
      { name: 'Technology', interests: ['Technology', 'Programming', 'Gaming', 'Robotics', 'AI', 'Web Development'] },
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
    selectedGrantInterests: string[] = [];
  
    // To track collapsed categories (all collapsed initially)
    collapsedGrantCategories: string[] = this.categorizedGrantInterests.map(c => c.name);
  
    ngOnInit(): void {
      // Check if localStorage is available
      if (typeof localStorage !== 'undefined') {
        const storedInterests = localStorage.getItem('selectedGrantInterests');
        if (storedInterests) {
          this.selectedGrantInterests = JSON.parse(storedInterests);
        }
      }
    }
  
    handleInterestChange(event: any, interest: string) {
      if (event.target.checked) {
        this.selectedGrantInterests.push(interest);
      } else {
        const index = this.selectedGrantInterests.indexOf(interest);
        if (index > -1) {
          this.selectedGrantInterests.splice(index, 1);
        }
      }
      // Persist to localStorage using the correct key
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('selectedGrantInterests', JSON.stringify(this.selectedGrantInterests));
      }
    }
    
    
  
    // Toggle category collapse state
    toggleGrantCategory(categoryName: string): void {
      const index = this.collapsedGrantCategories.indexOf(categoryName);
      if (index > -1) {
        // Expand category by removing it from collapsedCategories
        this.collapsedGrantCategories.splice(index, 1);
      } else {
        // Collapse category by adding it
        this.collapsedGrantCategories.push(categoryName);
      }
    }
  
    // Helper function to check if a category is collapsed
    isCollapsed(categoryName: string): boolean {
      return this.collapsedGrantCategories.includes(categoryName);
    }
  
    sendInterestData() {
  
      const prompt = `Find Education Grants related to ${this.selectedGrantInterests.join(', ')} for students planning to attend ${this.school}.
Please return the data in valid JSON with an array called "grants", 
where each grant has:
- "title"
- "description"
- "link"
- "deadline"
- "eligibility"

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
    
          // If the response includes ``` code block markers, remove them
          if (responseText.startsWith('```')) {
            responseText = responseText.replace(/^```[^\n]*\n/, '').replace(/\n```$/, '').trim();
          }
    
          // Attempt to parse JSON
          try {
            const parsed = JSON.parse(responseText);
    
            // Check if parsed.grants is an array
            if (parsed.grants && Array.isArray(parsed.grants)) {
              // Store in a component property
              this.grants = parsed.grants;
            } else {
              console.error("JSON does not contain a 'grants' array:", parsed);
              this.grants = [];
            }
          } catch (jsonError) {
            console.error("Error parsing JSON:", jsonError);
            this.grants = [];
          }
    
          // Optionally store the raw text if you want to show it somewhere
          this.premadResponse = responseText;
    
        } catch (error) {
          console.error("Error calling Gemini API:", error);
        } finally {
          this.loading = false;
        }
      }
    }
    
  
    constructor(private geminiService: GeminiService) { 

    }
  }

