import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { projectId } = useParams(); // Get the project ID from the URL

  // Mock data for demonstration (replace with API call if needed)
  const projectData = {
    1: {
      title: "E-commerce Platform",
      description: "Full-stack online store with React and Node.js",
      skills: ["React", "Node.js", "MongoDB"],
      members: 3,
      status: "active",
      details: `
        This project was built using React for the frontend and Node.js for the backend. 
        MongoDB was used as the database to store product and user information. 
        The application was deployed using AWS EC2 for the backend and AWS S3 for static assets.
      `,
    },
    2: {
      title: "Portfolio Builder",
      description: "AI-powered portfolio generator for developers",
      skills: ["Next.js", "Tailwind", "OpenAI API"],
      members: 2,
      status: "recruiting",
      details: `
        This project leverages Next.js for server-side rendering and Tailwind CSS for styling. 
        The OpenAI API is integrated to generate personalized portfolio content. 
        The application is deployed on Vercel for seamless CI/CD.
      `,
    },
    // Add more mock data as needed
  };

  const project = projectData[projectId];

  if (!project) {
    return <div className="text-center text-gray-400">Project not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-6 px-6">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
        <h1 className="text-3xl font-bold text-white mb-4">{project.title}</h1>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <p className="text-gray-400">Status: {project.status}</p>
        <p className="text-gray-400">Members: {project.members}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white mb-2">Skills:</h3>
          <div className="flex flex-wrap">
            {project.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Project Details:
          </h3>
          <p className="text-gray-300 whitespace-pre-line">{project.details}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;