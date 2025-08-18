import React, { useState } from 'react';
import { Calculator, Activity, Heart, TrendingUp, User, Ruler, Weight, Target } from 'lucide-react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [history, setHistory] = useState([]);

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return { name: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-100' };
    if (bmiValue >= 18.5 && bmiValue < 25) return { name: 'Normal weight', color: 'text-green-500', bg: 'bg-green-100' };
    if (bmiValue >= 25 && bmiValue < 30) return { name: 'Overweight', color: 'text-yellow-500', bg: 'bg-yellow-100' };
    return { name: 'Obese', color: 'text-red-500', bg: 'bg-red-100' };
  };

  const calculateBMI = () => {
    if (!height || !weight) return;

    let heightInMeters, weightInKg;

    if (unit === 'metric') {
      heightInMeters = parseFloat(height) / 100;
      weightInKg = parseFloat(weight);
    } else {
      heightInMeters = (parseFloat(height) * 0.0254);
      weightInKg = parseFloat(weight) * 0.453592;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmiValue * 10) / 10;
    
    setBmi(roundedBMI);
    setCategory(getBMICategory(roundedBMI));
    setIsCalculated(true);

    const newEntry = {
      id: Date.now(),
      bmi: roundedBMI,
      category: getBMICategory(roundedBMI),
      date: new Date().toLocaleDateString(),
      weight: unit === 'metric' ? `${weight} kg` : `${weight} lbs`,
      height: unit === 'metric' ? `${height} cm` : `${height} in`
    };
    setHistory(prev => [newEntry, ...prev.slice(0, 4)]);
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
    setIsCalculated(false);
  };

  const getBMIProgress = () => {
    if (!bmi) return 0;
    if (bmi < 18.5) return (bmi / 18.5) * 25;
    if (bmi < 25) return 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
    if (bmi < 30) return 50 + ((bmi - 25) / (30 - 25)) * 25;
    return 75 + Math.min(((bmi - 30) / 10) * 25, 25);
  };

  const getHealthTips = () => {
    if (!category) return [];
    const tips = {
      'Underweight': [
        'Eat nutrient-rich foods with healthy fats',
        'Include protein in every meal',
        'Consider strength training exercises',
        'Consult a nutritionist for a proper meal plan'
      ],
      'Normal weight': [
        'Maintain your current healthy lifestyle',
        'Stay active with regular exercise',
        'Eat a balanced diet with variety',
        'Monitor your weight regularly'
      ],
      'Overweight': [
        'Focus on portion control',
        'Increase physical activity gradually',
        'Choose whole foods over processed ones',
        'Stay hydrated throughout the day'
      ],
      'Obese': [
        'Consult with a healthcare professional',
        'Start with low-impact exercises',
        'Create a sustainable eating plan',
        'Track your progress regularly'
      ]
    };
    return tips[category.name] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a18cd1] via-[#fbc2eb] to-[#fad0c4] p-4 relative font-sans overflow-x-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1.5" fill="#fff" opacity="0.08" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 pt-10">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Calculator className="h-12 w-12 text-white drop-shadow-lg" />
            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg tracking-tight" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>BMI Calculator</h1>
          </div>
          <p className="text-white/90 text-xl max-w-2xl mx-auto font-medium">
            Calculate your Body Mass Index and get personalized health insights
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Calculator Card */}
          <div className="lg:col-span-2">
            <div className="bg-white/30 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300 hover:scale-[1.01]">
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-tr from-purple-400 via-pink-300 to-blue-400 rounded-full p-5 shadow-lg animate-pulse-slow">
                  <Activity className="h-10 w-10 text-white" />
                </div>
              </div>

              {/* Unit Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-white/20 rounded-full p-1 flex shadow-inner">
                  <button
                    onClick={() => setUnit('metric')}
                    className={`px-8 py-3 rounded-full transition-all duration-300 font-semibold text-lg ${
                      unit === 'metric' 
                        ? 'bg-gradient-to-r from-purple-400 to-blue-400 text-white shadow-lg scale-105' 
                        : 'text-purple-700 hover:bg-white/10'
                    }`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`px-8 py-3 rounded-full transition-all duration-300 font-semibold text-lg ${
                      unit === 'imperial' 
                        ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg scale-105' 
                        : 'text-purple-700 hover:bg-white/10'
                    }`}
                  >
                    Imperial
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-2">
                  <label className="text-white font-semibold flex items-center gap-2 text-lg">
                    <Ruler className="h-5 w-5" />
                    Height {unit === 'metric' ? '(cm)' : '(inches)'}
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={unit === 'metric' ? '170' : '68'}
                    className="w-full px-5 py-5 bg-white/30 border border-white/30 rounded-2xl text-purple-900 placeholder-purple-400 focus:outline-none focus:border-purple-400 focus:bg-white/50 transition-all duration-300 text-lg shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white font-semibold flex items-center gap-2 text-lg">
                    <Weight className="h-5 w-5" />
                    Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={unit === 'metric' ? '70' : '154'}
                    className="w-full px-5 py-5 bg-white/30 border border-white/30 rounded-2xl text-purple-900 placeholder-purple-400 focus:outline-none focus:border-purple-400 focus:bg-white/50 transition-all duration-300 text-lg shadow-inner"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-6">
                <button
                  onClick={calculateBMI}
                  disabled={!height || !weight}
                  className="flex-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 hover:from-green-500 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-xl text-lg"
                >
                  Calculate BMI
                </button>
                <button
                  onClick={reset}
                  className="bg-white/30 hover:bg-white/50 text-purple-700 font-bold py-5 px-8 rounded-2xl transition-all duration-300 border border-white/30 text-lg shadow"
                >
                  Reset
                </button>
              </div>

              {/* BMI Result */}
              {isCalculated && bmi && (
                <div className="mt-10 animate-fade-in">
                  <div className="bg-white/40 rounded-2xl p-8 text-center shadow-xl border border-white/30">
                    <div className="text-6xl font-extrabold text-purple-700 mb-2 animate-bounce-slow drop-shadow-lg">{bmi}</div>
                    <div className={`inline-block px-6 py-3 rounded-full ${category.bg} ${category.color} font-bold mb-4 text-lg shadow`}>
                      {category.name}
                    </div>
                    
                    {/* BMI Scale Visual */}
                    <div className="mt-8">
                      <div className="bg-white/20 rounded-full h-6 overflow-hidden relative shadow-inner">
                        <div className="h-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 relative">
                          <div 
                            className="absolute top-0 w-5 h-10 bg-white rounded-full shadow-2xl -mt-2 transition-all duration-700"
                            style={{ left: `calc(${getBMIProgress()}% - 10px)` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-purple-700/70 mt-3 font-semibold">
                        <span>Underweight</span>
                        <span>Normal</span>
                        <span>Overweight</span>
                        <span>Obese</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-8">
            {/* Health Tips */}
            {isCalculated && (
              <div className="bg-white/30 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-6 w-6 text-pink-400" />
                  <h3 className="text-purple-800 font-bold text-xl">Health Tips</h3>
                </div>
                <ul className="space-y-4">
                  {getHealthTips().map((tip, index) => (
                    <li key={index} className="text-purple-700/90 text-base flex items-start gap-2">
                      <Target className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* BMI Categories Reference */}
            <div className="bg-white/30 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-6 w-6 text-blue-400" />
                <h3 className="text-purple-800 font-bold text-xl">BMI Categories</h3>
              </div>
              <div className="space-y-4">
                {[
                  { range: 'Below 18.5', category: 'Underweight', color: 'bg-blue-100 text-blue-600' },
                  { range: '18.5 - 24.9', category: 'Normal', color: 'bg-green-100 text-green-600' },
                  { range: '25.0 - 29.9', category: 'Overweight', color: 'bg-yellow-100 text-yellow-600' },
                  { range: '30.0+', category: 'Obese', color: 'bg-red-100 text-red-600' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-purple-700/80 text-base">{item.range}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${item.color}`}>
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="bg-white/30 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  <h3 className="text-purple-800 font-bold text-xl">Recent Results</h3>
                </div>
                <div className="space-y-4">
                  {history.map((entry) => (
                    <div key={entry.id} className="bg-white/20 rounded-xl p-4 shadow flex flex-col gap-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-purple-800 font-bold text-lg">{entry.bmi}</span>
                        <span className="text-purple-400 text-xs">{entry.date}</span>
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm ${entry.category.bg} ${entry.category.color}`}>
                        {entry.category.name}
                      </div>
                      <div className="text-purple-400 text-xs mt-1">
                        {entry.height} • {entry.weight}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <p className="text-purple-700/70 text-base font-medium">
            BMI is a screening tool. Consult healthcare professionals for comprehensive health assessment.
          </p>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Poppins:wght@400;700;900&display=swap');
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-10px);}
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(168,85,247,0.5);}
          50% { box-shadow: 0 0 30px 10px rgba(168,85,247,0.2);}
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default BMICalculator;