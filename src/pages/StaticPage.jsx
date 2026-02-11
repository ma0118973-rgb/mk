import React, { useEffect } from 'react';

export const StaticPage = ({ type }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const email = "herlylynn@gmail.com";
  const websiteName = "VELARA";
  const websiteUrl = "https://velara.com"; // Placeholder, updated dynamically if needed

  const renderContent = () => {
    switch (type) {
      case 'privacy':
        return (
          <div className="space-y-10">
            <div className="border-b-2 border-indigo-500 pb-6">
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Privacy Policy for {websiteName}</h1>
              <p className="text-xl font-bold text-gray-400">Last Updated: February 2026</p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                <p>At {websiteName}, accessible from {websiteUrl}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by {websiteName} and how we use it.</p>
                <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. Our Privacy Policy was generated with the help of the GDPR Privacy Policy Generator.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">General Data Protection Regulation (GDPR)</h2>
                <p>We are a Data Controller of your information.</p>
                <p>{websiteName} legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect the information:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>{websiteName} needs to perform a contract with you</li>
                    <li>You have given {websiteName} permission to do so</li>
                    <li>Processing your personal information is in {websiteName} legitimate interests</li>
                    <li>{websiteName} needs to comply with the law</li>
                </ul>
                <p>{websiteName} will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Log Files</h2>
                <p>{websiteName} follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Cookies and Web Beacons</h2>
                <p>Like any other website, {websiteName} uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Google DoubleClick DART Cookie</h2>
                <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-blue-400 hover:underline">https://policies.google.com/technologies/ads</a></p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Privacy Policies</h2>
                <p>You may consult this list to find the Privacy Policy for each of the advertising partners of {websiteName}.</p>
                <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on {websiteName}, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
                <p>Note that {websiteName} has no access to or control over these cookies that are used by third-party advertisers.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Third Party Privacy Policies</h2>
                <p>{websiteName}'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>
                <p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Children's Information</h2>
                <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
                <p>{websiteName} does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Online Privacy Policy Only</h2>
                <p>Our Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in {websiteName}. This policy is not applicable to any information collected offline or via channels other than this website.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Consent</h2>
                <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
                
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contact Information</h2>
                <p>If you have any questions about this Privacy Policy, please contact us via email at: <strong>{email}</strong>.</p>
                
                <hr className="my-8 border-gray-700" />
                <p className="text-sm text-gray-500">
                    This detailed privacy policy helps ensure compliance with international standards such as GDPR, CalOPPA, and AdSense policies. It covers data collection, cookies, third-party advertising, and user rights.
                </p>
            </div>
          </div>
        );
        
      case 'terms':
        return (
          <div className="space-y-10">
            <div className="border-b-2 border-indigo-500 pb-6">
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Terms and Conditions</h1>
              <p className="text-xl font-bold text-gray-400">Last Updated: February 2026</p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                <p>Welcome to {websiteName}!</p>
                <p>These terms and conditions outline the rules and regulations for the use of {websiteName}'s Website, located at {websiteUrl}.</p>
                <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use {websiteName} if you do not agree to take all of the terms and conditions stated on this page.</p>
                
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Cookies</h2>
                <p>We employ the use of cookies. By accessing {websiteName}, you agreed to use cookies in agreement with the {websiteName}'s Privacy Policy.</p>
                <p>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">License</h2>
                <p>Unless otherwise stated, {websiteName} and/or its licensors own the intellectual property rights for all material on {websiteName}. All intellectual property rights are reserved. You may access this from {websiteName} for your own personal use subjected to restrictions set in these terms and conditions.</p>
                <p>You must not:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Republish material from {websiteName}</li>
                    <li>Sell, rent or sub-license material from {websiteName}</li>
                    <li>Reproduce, duplicate or copy material from {websiteName}</li>
                    <li>Redistribute content from {websiteName}</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">User Comments</h2>
                <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. {websiteName} does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of {websiteName},its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, {websiteName} shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
                <p>{websiteName} reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Hyperlinking to our Content</h2>
                <p>The following organizations may link to our Website without prior written approval:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Government agencies;</li>
                    <li>Search engines;</li>
                    <li>News organizations;</li>
                    <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                    <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Content Liability</h2>
                <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Reservation of Rights</h2>
                <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Removal of links from our website</h2>
                <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>
                <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Disclaimer</h2>
                <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>limit or exclude our or your liability for death or personal injury;</li>
                    <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                    <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                    <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                </ul>
                <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>
                <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
            </div>
          </div>
        );

      case 'disclaimer':
        return (
          <div className="space-y-10">
            <div className="border-b-2 border-indigo-500 pb-6">
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Disclaimer</h1>
              <p className="text-xl font-bold text-gray-400">Last Updated: February 2026</p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">General Information</h2>
                <p>The information provided by {websiteName} ("we," "us," or "our") on {websiteUrl} (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
                <p>UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">External Links Disclaimer</h2>
                <p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.</p>
                <p>WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Professional Disclaimer</h2>
                <p>The Site cannot and does not provide legal, medical, or financial advice. The legal, medical, or financial information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of legal, medical, or financial advice. THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THE SITE IS SOLELY AT YOUR OWN RISK.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Affiliates Disclaimer</h2>
                <p>The Site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links. Our affiliates include the following:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Google AdSense</li>
                    <li>Amazon Associates</li>
                    <li>ClickBank</li>
                    <li>ShareASale</li>
                </ul>
                <p>We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn advertising fees by linking to Amazon.com and affiliated websites.</p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Testimonials Disclaimer</h2>
                <p>The Site may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences. YOUR INDIVIDUAL RESULTS MAY VARY.</p>
                <p>The testimonials on the Site are submitted in various forms such as text, audio and/or video, and are reviewed by us before being posted. They appear on the Site verbatim as given by the users, except for the correction of grammar or typing errors. Some testimonials may have been shortened for the sake of brevity where the full testimonial contained extraneous information not relevant to the general public.</p>
                <p>The views and opinions contained in the testimonials belong solely to the individual user and do not reflect our views and opinions. We are not affiliated with users who provide testimonials, and users are not paid or otherwise compensated for their testimonials.</p>
                
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contact Us</h2>
                <p>If you have any questions about this Disclaimer, You can contact us:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>By email: <strong>{email}</strong></li>
                </ul>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="border-b-2 border-yellow-500 pb-6 mb-10">
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Contact Us</h1>
              <p className="text-xl text-gray-300">We'd love to hear from you. Please fill out the form below or reach us directly via email.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                    <i className="fas fa-envelope text-4xl text-yellow-500 mb-4"></i>
                    <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                    <p className="text-gray-400 break-all">{email}</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                    <i className="fas fa-phone-alt text-4xl text-blue-500 mb-4"></i>
                    <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                    <p className="text-gray-400">2535006555</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                    <i className="fas fa-map-marker-alt text-4xl text-green-500 mb-4"></i>
                    <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                    <p className="text-gray-400">United States</p>
                </div>
            </div>

            <form className="space-y-6 bg-white/5 p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-black uppercase text-gray-400 mb-2">First Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-yellow-500 text-white outline-none transition-colors" placeholder="John" />
                    </div>
                    <div>
                        <label className="block text-sm font-black uppercase text-gray-400 mb-2">Last Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-yellow-500 text-white outline-none transition-colors" placeholder="Doe" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-black uppercase text-gray-400 mb-2">Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-yellow-500 text-white outline-none transition-colors" placeholder={email} />
                </div>
                <div>
                    <label className="block text-sm font-black uppercase text-gray-400 mb-2">Subject</label>
                    <select className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-yellow-500 text-white outline-none transition-colors">
                        <option className="bg-slate-800">General Inquiry</option>
                        <option className="bg-slate-800">Advertising</option>
                        <option className="bg-slate-800">Report a Bug</option>
                        <option className="bg-slate-800">Privacy Concern</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-black uppercase text-gray-400 mb-2">Message</label>
                    <textarea className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-yellow-500 text-white h-48 resize-none outline-none transition-colors" placeholder="How can we help you?"></textarea>
                </div>
                <button className="w-full bg-yellow-500 text-black px-10 py-5 font-black uppercase tracking-widest hover:bg-yellow-400 rounded-xl text-xl transition-transform active:scale-95 shadow-lg">Send Message</button>
            </form>
            
            <div className="mt-12 text-center text-gray-500 text-sm">
                <p>By submitting this form, you agree to our <a href="/privacy" className="underline hover:text-white">Privacy Policy</a> and <a href="/terms" className="underline hover:text-white">Terms of Service</a>.</p>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-10">
             <div className="border-b-2 border-indigo-500 pb-6">
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4">About Us</h1>
              <p className="text-xl font-bold text-gray-400">Empowering Your Career Journey</p>
            </div>
             <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                <p>Welcome to {websiteName}, your number one source for all things related to jobs, career advice, and visa information. We're dedicated to giving you the very best of service, with a focus on dependability, customer service, and uniqueness.</p>
                <p>Founded in 2024, {websiteName} has come a long way from its beginnings. When we first started out, our passion for helping people find the right career path drove us to do intense research, and gave us the impetus to turn hard work and inspiration into to a booming online platform. We now serve customers all over the world, and are thrilled to be a part of the eco-friendly wing of the industry.</p>
                <p>We hope you enjoy our services as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
                <p className="mt-8 font-bold text-white">Sincerely,<br/>The {websiteName} Team</p>
             </div>
          </div>
        )

      default:
        return <div className="text-white text-center text-2xl py-20">Page not found.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};