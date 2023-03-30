import React , {useState} from 'react';
import AWS from 'aws-sdk'


const S3_BUCKET = process.env.REACT_APP_bucket_name;
const REGION = process.env.REACT_APP_S3_REGION;
const ACCESS_KEY =process.env.REACT_APP_AWS_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_KEY;


AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

export default function Upload2() {

    const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message,setMessage]=useState("")

  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
  }

  const uploadFile = (file) => {

      const params = {
          Body: file,
          Bucket: S3_BUCKET,
          Key: "user2/"+file.lastModifiedDate+"_"+file.name
      };

      myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
              setProgress(Math.round((evt.loaded / evt.total) * 100))
              setMessage("Successfully Uploaded")
          })
          .send((err) => {
              if (err) console.log(err)
          })
  }


  return (
    <>
      <div id="header-wrapper">
        <header id="header" className="5grid-layout">
          <div className="row">
            <div className="12u">
              <h1>
                <a
                  href="https://www.abexperiment.com/"
                  className="mobileUI-site-name"
                >
                  AB Experiment
                </a>
              </h1>

              <nav className="mobileUI-site-nav">
                <a href="https://www.abexperiment.com/">Home</a>
                <a href="https://www.abexperiment.com/ab_testing/">
                  A/B testing
                </a>
                <a href="https://www.abexperiment.com/causal-inference/">
                  Causal Inference
                </a>
                <a href="https://www.abexperiment.com/about_us/">About us</a>
              </nav>
            </div>
          </div>
        </header>
      </div>

      <div id="content-wrapper">
        <div id="content">
          <div className="5grid-layout">
            <div className="row">
              <div className="9u">
                <section>
                  <header>
                    <h2>AB Experiment Commitment</h2>
                    <h3>Advance AI with responsibility</h3>
                  </header>
                  <p>
										At our company, we are committed to advancing the field of artificial intelligence and leveraging its potential to create a better world. Our commitments for doing good experients are as follows:</p>

<p> <b>Ethical AI:</b> We are committed to building ethical AI systems that prioritize human values and rights. Our AI systems will be designed with transparency, fairness, and accountability in mind, and we will work to mitigate any potential biases and risks associated with their use.</p>

<p><b>Innovation:</b> We are committed to driving innovation in the field of AI and developing cutting-edge technologies that can solve real-world problems. We will invest in research and development, collaborate with industry and academic partners, and continuously improve our AI systems to deliver the best possible results.</p>

<p><b>Customer Success:</b> We are committed to the success of our customers and will work closely with them to understand their unique needs and goals. We will provide them with the best possible solutions and support to help them achieve their objectives.</p>

<p><b>Privacy and Security:</b> We are committed to protecting the privacy and security of our customers' data and ensuring that our AI systems comply with all relevant regulations and standards. We will implement robust security measures and data protection protocols to safeguard our customers' data.</p>

<p><b>Diversity and Inclusion:</b> We are committed to promoting diversity and inclusion in the field of AI and building a team that reflects the diversity of our global community. We will create an inclusive workplace culture that fosters creativity, collaboration, and innovation.</p>

<p>By upholding these commitments, we aim to be a trusted partner for our customers, a leading innovator in the field of AI, and a responsible member of the global community.</p>
<div>
      <div>File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput}/>
      <button onClick={() => uploadFile(selectedFile)}> Upload</button>
      <div>{message}</div>
  </div>
						
										
                </section>
              </div>
              <div className="3u">
                <section>
                  <header>
                    <h2>AB testing related topics</h2>
                  </header>
                  <ul className="link-list">
                    <li>
                      <a href="/#">AB testing for CX</a>
                    </li>
                  </ul>
                </section>
                <section>
                  <header>
                    <h2>Offline Experimentation</h2>
                  </header>
                  <p>
                    Good experiments move knowledge needle. Things you or other
                    already know, are not worth experimenting.
                  </p>
                  <ul className="link-list">
                    <li>
                      <a href="/#">Confidence interval</a>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="footer-wrapper">
        <footer id="footer" className="5grid-layout">
          <div className="row">
            <div className="8u">
              <section>
                <h2>AB testing related topics</h2>
                <div className="5grid">
                  <div className="row">
                    <div className="3u">
                      <ul className="link-list last-child">
                        <li>
                          <a href="/#">Travel</a>
                        </li>
                      </ul>
                    </div>
                    <div className="3u">
                      <ul className="link-list last-child">
                        <li>
                          <a href="/#">Small businesses</a>
                        </li>
                      </ul>
                    </div>
                    <div className="3u">
                      <ul className="link-list last-child">
                        <li>
                          <a href="/#">Medium traffic</a>
                        </li>
                      </ul>
                    </div>
                    <div className="3u">
                      <ul className="link-list last-child">
                        <li>
                          <a href="/#">Large traffic websites</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="4u">
              <section>
                <h2>Our Motto</h2>
                <p>
                  At AB Experiment we excel in our field of experimentation. We
                  integrate A/B testing with app development.
                </p>
              </section>
            </div>
          </div>
        </footer>
      </div>

      <div id="copyright">
        &copy; AB Experiment. All rights reserved. | Design:{" "}
        <a href="https://www.abexperiment.com">AB Experiment</a>
      </div>
    </>
  );
}
