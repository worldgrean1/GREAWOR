import Image from 'next/image';
import sisterLogo from '../../public/images/sister-logo.jpg';

export default function SisterCompanyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f5e9] to-[#e0f2f1] text-gray-900 flex flex-col items-center py-8 px-4">
      {/* Logo and Brand */}
      <div className="w-full flex flex-col items-center mb-8">
        <Image src={sisterLogo} alt="Ethio Renewable Energy Solution PLC logo, solar and clean energy company" width={120} height={120} className="rounded-full shadow-lg mb-4" placeholder="blur" blurDataURL="/images/sister-logo.jpg" />
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2 text-center">Ethio Renewable Energy Solution PLC</h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl">Ethio Renewable Energy Solution PLC is an Ethiopian company providing sustainable and affordable clean energy solutions. We offer solar and cookstove products including panels, inverters, batteries, backup systems, water heaters, and more. Our services cover installation, consultation, training, and after-sales support to promote energy access and empower communities across Ethiopia.</p>
        <span className="mt-2 text-sm text-gray-500">Founded: 2024 &bull; Independent Business</span>
      </div>

      {/* Services / Solutions */}
      <section className="w-full max-w-3xl mb-8">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Our Services & Solutions</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>Retail and Distribution of solar energy systems and clean cookstoves</li>
          <li>Installation and Maintenance of solar products and energy systems</li>
          <li>Consultation on renewable energy solutions and energy efficiency</li>
          <li>After-Sales Support including warranty services and technical assistance</li>
          <li>Training & Capacity Building for customers, technicians, and partners</li>
          <li>Product Customization for households, institutions, and productive use</li>
          <li>Energy Access Solutions for off-grid and rural communities</li>
          <li>Partnership & Financing Models including Pay-As-You-Go (PAYGO) and microfinance options</li>
        </ul>
      </section>

      {/* Highlights / USPs */}
      <section className="w-full max-w-3xl mb-8">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Why Choose Us?</h2>
        <ul className="space-y-3">
          <li><span className="font-bold">🌍 Locally Driven, Impact-Focused:</span> Deep understanding of Ethiopia's energy needs with tailored solutions for both rural and urban communities.</li>
          <li><span className="font-bold">🔋 Wide Product Range:</span> From solar panels to cookstoves, backup systems, water heaters, irrigation, and DC appliances – all under one roof.</li>
          <li><span className="font-bold">🛠️ End-to-End Services:</span> We provide complete solutions – consultation, installation, training, and long-term after-sales support.</li>
          <li><span className="font-bold">🤝 Community Empowerment:</span> Focus on women empowerment, productive use, and clean energy access to uplift livelihoods.</li>
          <li><span className="font-bold">💡 Flexible Financing Options:</span> Innovative models like Pay-As-You-Go (PAYGO) and partnerships with microfinance institutions.</li>
          <li><span className="font-bold">🔧 Technical Expertise:</span> Skilled professionals with over a decade of experience in renewable energy technologies.</li>
          <li><span className="font-bold">✅ Quality & Reliability:</span> Trusted products and services backed by warranty and continuous support.</li>
        </ul>
      </section>

      {/* Contact Information */}
      <section className="w-full max-w-3xl mb-8">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Contact Us</h2>
        <div className="space-y-2 text-gray-800">
          <div><span className="font-bold">Location:</span> Lemi Kura Sub-City, In front of Police Station, Addis Ababa, Ethiopia</div>
          <div><span className="font-bold">Phone:</span> <a href="tel:+251985341013" className="text-green-700 hover:underline">+251-985341013</a></div>
          <div><span className="font-bold">Email:</span> <a href="mailto:alemks2006@yahoo.com" className="text-green-700 hover:underline">alemks2006@yahoo.com</a></div>
          <div><span className="font-bold">Working Hours:</span> Monday – Saturday: 9:00 AM – 7:30 PM; Sunday: Closed</div>
          <div><span className="font-bold">TikTok:</span> Ethio_renewable energy solutions</div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Get in Touch or Visit Us!</h2>
        <ul className="space-y-3 text-lg">
          <li>🔌 <span className="font-bold">Ready to go solar or switch to clean cooking?</span> Contact us today for a free consultation or quote!</li>
          <li>📞 <span className="font-bold">Have questions or need support?</span> Call us or visit our store — we're happy to help you choose the right energy solution.</li>
          <li>💼 <span className="font-bold">Partner with us for community projects or institutional installations!</span> Let's bring clean energy to more people — reach out to collaborate.</li>
          <li>📩 <span className="font-bold">Stay updated on new products and offers!</span> Follow us on social media.</li>
          <li>🛒 <span className="font-bold">Visit our shop and experience our products in person!</span> Come see how clean energy can change your life.</li>
        </ul>
      </section>
    </div>
  );
} 