import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, BookOpen, Check, Heart, Home, Menu, ShieldCheck, Sparkles, UserRound, Users, Utensils, X } from 'lucide-react';

const campaign = { raised: 0, goal: 100000, supporters: 0 };
const impacts = [
  { amount: 100, title: 'School meals', text: 'Help provide nourishing meals that keep students ready to learn.', icon: Utensils, tone: 'sage' },
  { amount: 500, title: 'Books & supplies', text: 'Put essential learning materials into a student’s hands.', icon: BookOpen, tone: 'clay' },
  { amount: 1000, title: 'Uniforms & shoes', text: 'Help a child arrive at school feeling comfortable and prepared.', icon: Users, tone: 'gold' },
];
const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KSH', maximumFractionDigits: 0 }).format(value);

function Brand() {
  return <Link className="brand" to="/" aria-label="Impact Circle home"><span className="brand-mark"><Heart size={50} /></span><span>impact<span className="brand-light">circle</span></span></Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const close = () => setOpen(false);
  useEffect(() => { close(); window.scrollTo({ top: 0, behavior: 'auto' }); }, [location.pathname]);
  return <header className="site-header"><div className="header-inner"><Brand />
    <button className="mobile-menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
      <NavLink to="/programs" onClick={close}>Programs</NavLink>
      <NavLink to="/impact" onClick={close}>Our impact</NavLink>
      <NavLink to="/about" onClick={close}>Our story</NavLink>
      <button className="button button-small" onClick={() => { close(); navigate('/donate'); }}>Give today <ArrowRight size={15} /></button>
    </nav>
  </div></header>;
}

function Hero({ onDonate }) {
  const progress = Math.min(campaign.raised / campaign.goal * 100, 100);
  return <section className="hero section-wrap" id="home">
    <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> SMALL GIFTS. LASTING CHANGE.</div>
      <h1>A brighter future starts with a school day.</h1>
      <p className="hero-description">Help children access the books, uniforms, and nourishing meals they need to learn with confidence.</p>
      <div className="hero-actions"><button className="button" onClick={onDonate}>Make a difference <ArrowRight size={17} /></button><Link className="text-link" to="/impact">See your impact <ArrowDownRight size={17} /></Link></div>
      <div className="trust-line"><ShieldCheck size={16} /> Thoughtful giving, transparent impact</div>
    </div>
    <div className="hero-visual"><img className="hero-image" src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85" alt="Students learning together in a classroom" />
      <div className="image-note"><span className="note-icon"><Heart size={17} fill="currentColor" /></span><span><strong>Every child deserves</strong><small>a chance to thrive.</small></span></div><div className="image-stamp"><span>GIVE</span><Heart size={20} /><span>HOPE</span></div>
    </div>
    <div className="campaign-card" id="programs"><div className="campaign-top"><div><span className="card-kicker">FEATURED CAMPAIGN</span><h2>Back to school, full of possibility</h2></div><span className="campaign-icon"><Sparkles size={20} /></span></div>
      <div className="progress-meta"><span><strong>{money(campaign.raised)}</strong> raised</span><span>Goal {money(campaign.goal)}</span></div><div className="progress-track" role="progressbar" aria-label="Campaign funding progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress)}><span style={{ width: `${progress}%` }} /></div>
      <div className="campaign-bottom"><span><Users size={15} /> {campaign.supporters} kind supporters</span><button className="inline-link" onClick={onDonate}>Support campaign <ArrowRight size={17} /></button></div>
    </div>
  </section>;
}

function Story() {
  return <section className="story-section section-wrap" id="story"><div className="story-image-wrap"><img src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1000&q=85" alt="Children smiling together outdoors" loading="lazy" /><div className="story-image-caption"><span className="caption-line" /> Rooted in community, growing together</div></div>
    <div className="story-copy"><div className="eyebrow">WHY WE SHOW UP</div><h2>Opportunity should never be out of reach.</h2><p>Talent is everywhere. Opportunity isn’t always. Impact Circle brings people together to help remove everyday barriers to education, one thoughtful gift at a time.</p><Link className="text-link" to="/about">Get to know our mission <ArrowRight size={16} /></Link><div className="mini-stat-row"><div><strong>328</strong><span>people giving</span></div><div><strong>1 goal</strong><span>more opportunity</span></div></div></div>
  </section>;
}

function Impact() {
  return <section className="impact-section" id="impact"><div className="section-wrap"><div className="section-heading"><div><div className="eyebrow">SMALL GIFTS, REAL-LIFE CHANGE</div><h2>What your monthly gift does</h2></div><p>Choose a kind of support. Together, the little things add up to something big.</p></div>
    <div className="impact-grid">{impacts.map(({ amount, title, text, icon: Icon, tone }) => <article className="impact-card" key={title}><div className={`impact-icon ${tone}`}><Icon size={22} /></div><div className="impact-amount">{money(amount)}<span> / month</span></div><h3>{title}</h3><p>{text}</p><Link to="/donate" className="impact-card-link">Make this possible <ArrowRight size={15} /></Link></article>)}</div>
  </div></section>;
}

function Testimonial() {
  return <section className="testimonial section-wrap"><div className="quote-mark">“</div><blockquote>When children have what they need to learn, you can see their confidence begin to grow. That’s what keeps us going.</blockquote><div className="quote-person"><div className="avatar">AM</div><div><strong>Amina M.</strong><span>Community education partner</span></div></div></section>;
}

function Donation() {
  const [frequency, setFrequency] = useState('Monthly');
  const [amount, setAmount] = useState(1000);
  const [custom, setCustom] = useState('');
  const [email, setEmail] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [message, setMessage] = useState('');
  const selected = amount === 'custom' ? Math.max(0, Number(custom) || 0) : amount;
  function submit(event) {
    event.preventDefault();
    if (selected <= 0) { setMessage('Choose a gift amount greater than KSH 0 to continue.'); return; }
    if (!showEmail) { setShowEmail(true); setMessage('Your gift is ready. Add your email to continue.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMessage('Please enter a valid email address.'); return; }
    setMessage(`Thanks for choosing to give ${money(selected)} ${frequency.toLowerCase()}. Payment setup is not connected yet.`);
  }
  return <section className="donation-section" id="donate"><div className="donation-wrap section-wrap"><div className="donation-intro"><div className="eyebrow light"><span className="eyebrow-dot" /> YOUR KINDNESS GOES FURTHER</div><h2>Be part of someone’s brighter tomorrow.</h2><p>Choose a gift that feels right for you. Every contribution helps create room for possibility.</p><div className="donation-assurance"><ShieldCheck size={17} /> Secure, thoughtful giving <span>·</span> Real-world impact</div></div>
    <form className="donation-form" onSubmit={submit}><div className="form-heading"><span className="form-step">YOUR GIFT</span><span className="form-heart"><Heart size={18} /></span></div><div className="frequency-switch" aria-label="Donation frequency">{['Monthly', 'One-time'].map((item) => <button key={item} type="button" className={frequency === item ? 'active' : ''} aria-pressed={frequency === item} onClick={() => setFrequency(item)}>{item}</button>)}</div>
      <label className="field-label">Choose an amount</label><div className="amount-grid">{[1000, 2000, 5000, 10000].map((value) => <button key={value} type="button" className={`amount-option ksh{amount === value ? 'selected' : ''}`} aria-pressed={amount === value} onClick={() => { setAmount(value); setMessage(''); }}>ksh{value}{value === 1000 && <span>POPULAR</span>}</button>)}</div>
      <label className={`custom-amount ${amount === 'custom' ? 'custom-selected' : ''}`}><span>KSH</span><input type="number" min="1" step="1" placeholder="Enter a custom amount" aria-label="Custom donation amount in Kenyan Shillings" value={custom} onFocus={() => setAmount('custom')} onChange={(event) => { setCustom(event.target.value); setAmount('custom'); setMessage(''); }} /></label>
      {showEmail && <label className="email-field"><span className="field-label">Email address</span><input type="email" placeholder="you@gmail.com" value={email} onChange={(event) => { setEmail(event.target.value); setMessage(''); }} required /></label>}
      <div className="gift-summary"><span>Your {frequency.toLowerCase()} gift</span><strong>{money(selected || 0)}{frequency === 'Monthly' && <small> / month</small>}</strong></div><button className="button donate-submit" type="submit">{showEmail ? 'Continue with this gift' : 'Continue to give'} <ArrowRight size={17} /></button>{message && <p className="form-message" role="status">{message}</p>}<p className="fine-print"><ShieldCheck size={13} /> Payment processing will be connected before launch.</p>
    </form></div></section>;
}

function PageIntro({ eyebrow, title, description }) {
  return <section className="page-intro section-wrap"><div className="eyebrow"><span className="eyebrow-dot" /> {eyebrow}</div><h1>{title}</h1><p>{description}</p></section>;
}

function HomePage() {
  const navigate = useNavigate();
  const goDonate = () => navigate('/donate');
  return <><Hero onDonate={goDonate} /><section className="home-next section-wrap"><div><div className="eyebrow">GIVING THAT GOES FURTHER</div><h2>One community. More possibilities.</h2><p>Explore the programs, discover what your gift can do, or learn more about the people behind the mission.</p></div><div className="home-links"><Link to="/programs" className="home-link-card"><span className="home-link-icon"><BookOpen /></span><strong>Explore programs</strong><span>See where support is needed <ArrowRight size={15} /></span></Link><Link to="/impact" className="home-link-card"><span className="home-link-icon"><Sparkles /></span><strong>See our impact</strong><span>Discover what giving makes possible <ArrowRight size={15} /></span></Link></div></section><Testimonial /></>;
}

function ProgramsPage() {
  const navigate = useNavigate();
  return <><PageIntro eyebrow="OUR PROGRAMS" title="Practical support. Lasting possibility." description="Every program is designed to help remove everyday barriers to education and give children more room to thrive." /><section className="programs-page section-wrap"><article className="program-feature"><img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85" alt="Students learning in a classroom" /><div className="program-feature-copy"><span className="card-kicker">FEATURED CAMPAIGN</span><h2>Back to school, full of possibility</h2><p>Help children access books, uniforms, shoes, and nourishing meals so they can show up ready to learn.</p><div className="program-stat"><strong>{money(campaign.raised)}</strong><span>raised toward {money(campaign.goal)} goal</span></div><div className="progress-track"><span style={{ width: `${Math.min(campaign.raised / campaign.goal * 100, 100)}%` }} /></div><button className="button" onClick={() => navigate('/donate')}>Support this campaign <ArrowRight size={16} /></button></div></article><div className="program-list-heading"><div className="eyebrow">WAYS TO HELP</div><h2>Support that meets real needs</h2></div><div className="impact-grid">{impacts.map(({ amount, title, text, icon: Icon, tone }) => <article className="impact-card" key={title}><div className={`impact-icon ${tone}`}><Icon size={22} /></div><div className="impact-amount">{money(amount)}<span> / month</span></div><h3>{title}</h3><p>{text}</p><button className="impact-card-link button-reset" onClick={() => navigate('/donate')}>Support this need <ArrowRight size={15} /></button></article>)}</div></section></>;
}

function ImpactPage() {
  return <><PageIntro eyebrow="OUR IMPACT" title="Small gifts can open big doors." description="A thoughtful contribution can help make learning more accessible, one practical need at a time." /><Impact /><Testimonial /><section className="impact-cta section-wrap"><div><h2>Be part of the progress.</h2><p>Choose a gift that feels right for you and help turn possibility into opportunity.</p></div><Link className="button" to="/donate">Make a gift <ArrowRight size={16} /></Link></section></>;
}

function AboutPage() {
  return <><PageIntro eyebrow="OUR STORY" title="Opportunity should never be out of reach." description="We believe children deserve the tools, nourishment, and encouragement to discover what they can become." /><Story /><section className="values-section section-wrap"><div className="eyebrow">WHAT GUIDES US</div><h2>Care that is practical, local, and hopeful.</h2><div className="values-grid"><article><span>01</span><h3>People first</h3><p>We start by listening to communities and understanding what support is useful.</p></article><article><span>02</span><h3>Purposeful giving</h3><p>We focus on meaningful everyday needs that can help students participate in school.</p></article><article><span>03</span><h3>Shared progress</h3><p>Lasting change grows when people work together with care and accountability.</p></article></div></section><Testimonial /></>;
}

function DonatePage() {
  return <><PageIntro eyebrow="MAKE A DIFFERENCE" title="Your kindness can change a school day." description="Choose a one-time or monthly gift. The donation experience is a prototype until payment processing is connected." /><Donation /></>;
}

function ProfilePage() {
  return <><PageIntro eyebrow="YOUR CIRCLE" title="Your giving journey starts here." description="A future profile area for managing your giving preferences and viewing your donation history." /><section className="profile-panel section-wrap"><div className="profile-icon"><UserRound size={28} /></div><h2>Your Impact Circle profile</h2><p>Profile accounts and donation history are not connected yet. You can still explore our programs or make a gift as a guest.</p><div className="profile-actions"><Link className="button" to="/donate">Give as a guest <ArrowRight size={16} /></Link><Link className="text-link" to="/programs">Explore programs <ArrowRight size={15} /></Link></div></section></>;
}

function NotFoundPage() {
  return <section className="not-found section-wrap"><span>404</span><h1>Looks like this page wandered off.</h1><p>Let's get you back to the good things.</p><Link to="/" className="button">Back to home <ArrowRight size={16} /></Link></section>;
}

function BottomNav() {
  const items = [{ label: 'Home', icon: Home, to: '/' }, { label: 'Programs', icon: BookOpen, to: '/programs' }, { label: 'Donate', icon: Heart, to: '/donate' }, { label: 'Impact', icon: Sparkles, to: '/impact' }, { label: 'Profile', icon: UserRound, to: '/profile' }];
  return <nav className="bottom-nav" aria-label="Quick navigation">{items.map(({ label, icon: Icon, to }) => <NavLink key={label} to={to} className={({ isActive }) => `${label === 'Donate' ? 'bottom-nav-donate ' : ''}${isActive ? 'is-active' : ''}`}><Icon size={19} /><span>{label}</span></NavLink>)}</nav>;
}

function AppShell() {
  const location = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [location.pathname]);
  return <><Header /><main><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/programs" element={<ProgramsPage />} />
    <Route path="/impact" element={<ImpactPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/donate" element={<DonatePage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes><section className="closing-note section-wrap"><div className="closing-icon"><Heart size={21} /></div><p>Thank you for believing in what’s possible.</p><span>Good things grow when we grow them together.</span></section></main><footer className="site-footer"><div className="section-wrap footer-inner"><Brand /><span>Made with care. Built for brighter futures.</span><span>© {new Date().getFullYear()} Impact Circle</span></div></footer><BottomNav /></>;
}

export default function App() {
  return <BrowserRouter><AppShell /></BrowserRouter>;
}
