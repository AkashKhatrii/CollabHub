import Feature from "../Feature/Feature";
import './Features.css'
export default function Features(){

    const features = [
        {
            title: "Project Collaboration",
            description: "Collaborate with other students on projects related to your interests and skills. Find team members who complement your abilities and work together to achieve common goals."
        },
        {
            title: "Skill Matching",
            description: "Discover students with skills that complement yours. CollabMate's skill matching algorithm helps you find the right collaborators for your projects based on their skills and expertise."
        },
        {
            title: "Project Discovery",
            description: "Explore a wide range of projects posted by other students. Find inspiring ideas, join ongoing projects, or start your own project and invite others to join."
        },
        {
            title: "Real-time Collaboration",
            description: "Collaborate with team members in real-time using CollabMate's built-in chat and collaboration tools. Stay connected, share ideas, and work together seamlessly."
        },
        {
            title: "Profile Customization",
            description: "Customize your profile to showcase your skills, interests, and projects. Your profile helps others learn more about you and your contributions to the community."
        },
        {
            title: "Notifications",
            description: "Stay informed about project updates, new collaboration opportunities, and messages from other users with CollabMate's notification system. Never miss an important update."
        },
        {
            title: "Project Management",
            description: "Manage your projects effectively with CollabMate's project management tools. Organize tasks, set deadlines, and track progress to ensure successful project completion."
        },
        {
            title: "Feedback and Ratings",
            description: "Provide feedback and ratings for your collaborators based on your experience working with them. Build a reputation within the community and find reliable partners for future projects."
        },
        {
            title: "Community Engagement",
            description: "Engage with the CollabMate community through forums, discussions, and events. Share knowledge, seek advice, and connect with like-minded individuals from around the world."
        },
        {
            title: "Privacy and Security",
            description: "CollabMate prioritizes the privacy and security of its users. Your personal information and project details are protected using industry-standard security measures."
        }
    ];

    const leftFeatures = features.slice(0, 5);
    const rightFeatures = features.slice(5);

    return(
        <section id="features" className="features-section">
            <div className="features-section-wrapper">
                    <div className="features-heading">
                    <h2>Key Features</h2>
                    <p>Explore the tools that connect, support, and empower your projects.</p>
                    </div>
                
                <div className="features-info">
                    <div className="features-column">
                        {leftFeatures.map((feature, index) => (
                            <Feature key={index} title={feature.title} desc={feature.description} />
                        ))}
                    </div>
                    <div className="features-column">
                        {rightFeatures.map((feature, index) => (
                            <Feature key={index + 5} title={feature.title} desc={feature.description} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}