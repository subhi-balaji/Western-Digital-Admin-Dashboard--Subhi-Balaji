import React from 'react'

export default function About() {
    return (
        <div className="container mt-5" style={{ "textAlign": "center" }}>
            <h3>Welcome to the Western Digital Dashboard! <br/> <br/> <br/>

                Firstly, you will need to make a new account. Remember, your e-mail address needs to be in the list of whitelisted e-mails in order for you to make an account and the password has to be at least 8 characters long. Once you make a new account you will need to log in and then you will be able to view the dashboard itself and it will also appear in the navigation bar. <br/> <br/>

                Each of the tiles represents an individual computer and some system specification pertaining to that particular computer. Clicking on a computer will take you to its processes which are split into two sections. "Main processes" includes any of the 5 applications that were requested to be monitored and also include any of their subprocesses and windows. "All processes" includes all of the other processes that are running on that particular computer. Each process tile includes the elapsed time, the date started, and the disk read and written for that particular process. <br/> <br/>

                Clicking on the "dashboard" on the navigation bar will always take you back to the main dashboard page where you can navigate to a different computer. Clicking on the "Toggle Theme" button will toggle between light and dark mode. Once you are done using the app, you can click on the logout button and you will be logged out and the "dashboard" will disappear from the navigation bar. </h3>
        </div>
    )
}
