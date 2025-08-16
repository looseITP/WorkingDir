document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('close-modal');
    const detailsButtons = document.querySelectorAll('.details-button');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalTech = document.getElementById('modal-tech');

    const projects = {
        'hl7-fhir': {
            title: 'HL7 FHIR API Tester',
            description: 'This project involved developing a comprehensive test framework for complex healthcare APIs. We focused on ensuring seamless data exchange between different systems while strictly adhering to HIPAA regulations. Key activities included automated end-to-end testing, performance load testing, and security checks on protected health information (PHI).',
            tech: 'Technologies: Python, Postman, SQL, JIRA, Splunk, HL7spy'
        },
        'mobile-automation': {
            title: 'Mobile Test Automation',
            description: 'In this project, I led the creation of an automated test suite for our mobile application. The framework was built using Appium and Cypress, enabling us to run regression tests on both iOS and Android platforms efficiently. This project significantly reduced our release cycle time and improved overall software quality.',
            tech: 'Technologies: Appium, Cypress.io, JavaScript, Agile SDLC, Visual Studio Code'
        },
        'etl-testing': {
            title: 'ETL Integration Testing',
            description: 'This initiative focused on the quality assurance of our data pipeline. My role involved creating and executing detailed test plans to validate data extraction, transformation, and loading (ETL) processes. I ensured data accuracy and integrity by writing complex SQL and MongoDB queries to compare source and destination data.',
            tech: 'Technologies: SQL, MongoDB, Python, ETL, Snowflake, Git'
        }
    };

    detailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.project;
            const project = projects[projectId];
            if (project) {
                modalTitle.textContent = project.title;
                modalBody.textContent = project.description;
                modalTech.textContent = project.tech;
                modal.classList.remove('hidden');
            }
        });
    });

    closeButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
