// import React from 'react';
// import { Leaf, BarChart2, Users, Trophy, Crown, Dumbbell, Heart, Zap, Flame } from 'lucide-react';
// import './FitnessLanding.css';

// const FitnessLanding = () => {
//   const features = [
//     { icon: <Leaf size={20} />, text: "Nutrition Guidance" },
//     { icon: <Trophy size={20} />, text: "Expert Trainers" },
//     { icon: <BarChart2 size={20} />, text: "Progress Tracking" },
//     { icon: <Crown size={20} />, text: "Premium Membership" },
//     { icon: <Users size={20} />, text: "Community Support" },
//     { icon: <Dumbbell size={20} />, text: "Next-Level Fitness Spaces" },
//   ];

//   const plans = [
//     {
//       title: "Cardio Training",
//       icon: <Heart className="plan-icon" />,
//       desc: "Boost endurance and heart health with high-energy cardio sessions designed to keep you moving."
//     },
//     {
//       title: "Strength Build",
//       icon: <Dumbbell className="plan-icon" />,
//       desc: "Develop power and resilience through expert-guided strength training tailored to all fitness levels."
//     },
//     {
//       title: "Fat Loss",
//       icon: <Flame className="plan-icon" />,
//       desc: "Shed unwanted fat with dynamic workout routines and fat-burning strategies that deliver lasting results."
//     },
//     {
//       title: "HIIT Workouts",
//       icon: <Zap className="plan-icon" />,
//       desc: "Maximize calorie burn and improve fitness with short, intense high-intensity interval training sessions."
//     }
//   ];

//   return (
//     <div className="fitness-page">
//       {/* Hero Section */}
//       <section className="hero-section">
//         <h1 className="main-title">
//           Inspired to <br /> <span>Inspire Your Best Self</span>
//         </h1>
//         <p className="subtitle">
//           We're Your Partner In Achieving A Healthier, Stronger, And More Confident You.
//         </p>

//         <div className="feature-card">
//           <div className="feature-grid">
//             {features.map((f, i) => (
//               <div key={i} className="feature-item">
//                 <div className="icon-wrapper">{f.icon}</div>
//                 <span>{f.text}</span>
//               </div>
//             ))}
//           </div>
//           <div className="athlete-image-container">
//              {/* Replace with your actual athlete image path */}
//             <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop" alt="Athlete" />
//           </div>
//         </div>
//       </section>

//       {/* Discover Section */}
//       <section className="discover-section">
//         <h2 className="section-title">
//           Discover <br /> <span>What Sets Us Apart</span>
//         </h2>
//         <p className="subtitle">
//           We Deliver A Fitness Experience That's Truly One-Of-A-Kind. Explore How We Help You Achieve Your Goals Faster And Smarter.
//         </p>

//         <div className="plans-grid">
//           {plans.map((plan, i) => (
//             <div key={i} className="plan-card">
//               <div className="plan-header">
//                 {plan.icon}
//                 <h3>{plan.title}</h3>
//               </div>
//               <p>{plan.desc}</p>
//               <button className="see-plan-btn">See Plan</button>
//             </div>
//           ))}
//         </div>
        
//         <div className="pagination-dots">
//           <span className="dot active"></span>
//           <span className="dot"></span>
//           <span className="dot"></span>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FitnessLanding;


import React from 'react';
import { Leaf, BarChart2, Users, Trophy, Crown, Dumbbell, Heart, Zap, Flame } from 'lucide-react';
import './FitnessLanding.css';

const FitnessLanding = () => {
  const features = [
    { icon: <Leaf size={20} />, text: "Nutrition Guidance" },
    { icon: <Trophy size={20} />, text: "Expert Trainers" },
    { icon: <BarChart2 size={20} />, text: "Progress Tracking" },
    { icon: <Crown size={20} />, text: "Premium Membership" },
    { icon: <Users size={20} />, text: "Community Support" },
    { icon: <Dumbbell size={20} />, text: "Next-Level Fitness Spaces" },
  ];

  const plans = [
    {
      title: "Cardio Training",
      icon: <Heart className="inspire-plan-icon" />,
      desc: "Boost endurance and heart health with high-energy cardio sessions designed to keep you moving."
    },
    {
      title: "Strength Build",
      icon: <Dumbbell className="inspire-plan-icon" />,
      desc: "Develop power and resilience through expert-guided strength training tailored to all fitness levels."
    },
    {
      title: "Fat Loss",
      icon: <Flame className="inspire-plan-icon" />,
      desc: "Shed unwanted fat with dynamic workout routines and fat-burning strategies that deliver lasting results."
    },
    {
      title: "HIIT Workouts",
      icon: <Zap className="inspire-plan-icon" />,
      desc: "Maximize calorie burn and improve fitness with short, intense high-intensity interval training sessions."
    }
  ];

  return (
    <div className="inspire-wrapper">
      {/* Hero Section */}
      <section className="inspire-hero">
        <h1 className="inspire-main-title">
          Inspired to <br /> <span className="inspire-highlight">Inspire Your Best Self</span>
        </h1>
        <p className="inspire-subtitle">
          We're Your Partner In Achieving A Healthier, Stronger, And More Confident You.
        </p>

        <div className="inspire-feature-card">
          <div className="inspire-feature-grid">
            {features.map((f, i) => (
              <div key={i} className="inspire-feature-item">
                <div className="inspire-icon-circle">{f.icon}</div>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
          <div className="inspire-image-box">
            <img 
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop" 
              alt="Athlete" 
            />
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section className="inspire-discover">
        <h2 className="inspire-section-title">
          Discover <br /> <span className="inspire-highlight">What Sets Us Apart</span>
        </h2>
        <p className="inspire-subtitle">
          We Deliver A Fitness Experience That's Truly One-Of-A-Kind. Explore How We Help You Achieve Your Goals Faster And Smarter.
        </p>

        <div className="inspire-plans-grid">
          {plans.map((plan, i) => (
            <div key={i} className="inspire-plan-card">
              <div className="inspire-plan-header">
                {plan.icon}
                <h3>{plan.title}</h3>
              </div>
              <p>{plan.desc}</p>
              <button className="inspire-see-plan-btn">See Plan</button>
            </div>
          ))}
        </div>
        
        <div className="inspire-pagination">
          <span className="inspire-dot inspire-active"></span>
          <span className="inspire-dot"></span>
          <span className="inspire-dot"></span>
        </div>
      </section>
    </div>
  );
};

export default FitnessLanding;