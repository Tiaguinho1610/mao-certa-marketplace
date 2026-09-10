import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react'

type Professional = {
  id: number
  name: string
  role: string
  location: string
  rating: number
  reviews: number
  price: string
  image: string
  initials: string
  color: string
  verified: boolean
  experience: string
  description: string
  phone: string
  availability: string
  featured?: boolean
}

type ProviderSignup = {
  name: string
  email: string
  phone: string
  category: string
  city: string
  description: string
}

const categories = [
  { label: 'Todos', icon: '✦' },
  { label: 'Elétrica', icon: '⚡' },
  { label: 'Hidráulica', icon: '⌁' },
  { label: 'Reformas', icon: '▧' },
  { label: 'Pintura', icon: '◒' },
  { label: 'Limpeza', icon: '✧' },
]

const serviceCities = ['Todas as cidades', 'Taquara', 'Parobé', 'Igrejinha']

const professionals: Professional[] = [
  {
    id: 1,
    name: 'Rafael Nascimento',
    role: 'Eletricista residencial',
    location: 'Taquara, RS',
    rating: 4.9,
    reviews: 126,
    price: 'a partir de R$ 90',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=85',
    initials: 'RN',
    color: '#e4b85c',
    verified: true,
    experience: '8 anos de experiência',
    description: 'Instalações elétricas residenciais, manutenção, iluminação e adequação de quadros com segurança e acabamento cuidadoso.',
    phone: '(51) 99912-3456',
    availability: 'Atende hoje',
    featured: true,
  },
  {
    id: 2,
    name: 'João Lucas',
    role: 'Pedreiro e reformas',
    location: 'Parobé, RS',
    rating: 5.0,
    reviews: 84,
    price: 'a partir de R$ 150',
    image: 'https://images.unsplash.com/photo-1503387762-592dea58ef25?auto=format&fit=crop&w=900&q=85',
    initials: 'JL',
    color: '#b7c6a5',
    verified: true,
    experience: '12 anos de experiência',
    description: 'Reformas completas, alvenaria, pisos e acabamentos para transformar sua casa com planejamento e qualidade.',
    phone: '(51) 99876-2109',
    availability: 'Agenda nesta semana',
  },
  {
    id: 3,
    name: 'Mariana Alves',
    role: 'Pintora de interiores',
    location: 'Igrejinha, RS',
    rating: 4.8,
    reviews: 61,
    price: 'a partir de R$ 120',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=85',
    initials: 'MA',
    color: '#d5a497',
    verified: true,
    experience: '6 anos de experiência',
    description: 'Pintura interna e externa, preparação de paredes e escolha de cores para ambientes residenciais e comerciais.',
    phone: '(51) 99145-7820',
    availability: 'Atende hoje',
  },
  {
    id: 4,
    name: 'Carlos Henrique',
    role: 'Encanador',
    location: 'Taquara, RS',
    rating: 4.9,
    reviews: 108,
    price: 'a partir de R$ 80',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=85',
    initials: 'CH',
    color: '#97b8c2',
    verified: true,
    experience: '10 anos de experiência',
    description: 'Consertos hidráulicos, instalação de torneiras, chuveiros, caixas d\'água e prevenção de vazamentos.',
    phone: '(51) 99731-4802',
    availability: 'Agenda nesta semana',
  },
  {
    id: 5,
    name: 'Ana Paula Souza',
    role: 'Limpeza e organização',
    location: 'Igrejinha, RS',
    rating: 4.9,
    reviews: 73,
    price: 'a partir de R$ 100',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85',
    initials: 'AS',
    color: '#d9bc71',
    verified: true,
    experience: '5 anos de experiência',
    description: 'Limpeza residencial detalhada e organização de ambientes para deixar sua rotina mais leve.',
    phone: '(51) 99602-1188',
    availability: 'Atende amanhã',
  },
]

function ProfessionalProfile({ professional, onClose }: { professional: Professional; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="professional-profile" role="dialog" aria-modal="true" aria-labelledby="profile-title" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar perfil"><X size={20} /></button>
        <div className="profile-hero"><img src={professional.image} alt={`Foto de ${professional.name}`} /><div className="profile-avatar" style={{ backgroundColor: professional.color }}>{professional.initials}</div></div>
        <div className="profile-body"><span className="overline">Profissional verificado</span><h2 id="profile-title">{professional.name}</h2><p className="profile-role">{professional.role}</p><div className="profile-meta"><span><MapPin size={15} /> {professional.location}</span><span><Star size={15} fill="currentColor" /> {professional.rating} ({professional.reviews} avaliações)</span></div><p className="profile-description">{professional.description}</p><div className="profile-facts"><span><strong>Experiência</strong>{professional.experience}</span><span><strong>Disponibilidade</strong>{professional.availability}</span><span><strong>Valor</strong>{professional.price}</span></div><a className="profile-contact" href={`https://wa.me/55${professional.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Falar pelo WhatsApp <ArrowRight size={16} /></a></div>
      </div>
    </div>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('Todas as cidades')
  const [favorites, setFavorites] = useState<number[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [signupSent, setSignupSent] = useState(false)
  const [signupData, setSignupData] = useState<ProviderSignup>({
    name: '',
    email: '',
    phone: '',
    category: '',
    city: '',
    description: '',
  })
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)

  const openSignup = () => {
    setSignupSent(false)
    setIsSignupOpen(true)
  }

  const updateSignup = (field: keyof ProviderSignup, value: string) => {
    setSignupData((current) => ({ ...current, [field]: value }))
  }

  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSignupSent(true)
  }

  const visibleProfessionals = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim()
    return professionals.filter((professional) => {
      const matchesCategory = activeCategory === 'Todos' || professional.role.toLowerCase().includes(activeCategory.toLowerCase().replace('elétrica', 'eletricista').replace('hidráulica', 'encanador').replace('reformas', 'reforma'))
      const matchesSearch = !normalizedSearch || `${professional.name} ${professional.role} ${professional.location}`.toLowerCase().includes(normalizedSearch)
      const matchesLocation = location === 'Todas as cidades' || professional.location.startsWith(location)
      return matchesCategory && matchesSearch && matchesLocation
    })
  }, [activeCategory, location, searchTerm])

  const toggleFavorite = (id: number) => {
    setFavorites((current) => (current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id]))
  }

  const handleSearch = () => {
    setHasSearched(true)
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="app-shell">
      {selectedProfessional && <ProfessionalProfile professional={selectedProfessional} onClose={() => setSelectedProfessional(null)} />}
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Mão Certa início">
          <span className="brand-mark"><span /></span>
          <span>mão <strong>certa</strong></span>
        </a>
        <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <a href="#como-funciona" onClick={() => setIsMenuOpen(false)}>Como funciona</a>
          <a href="#profissionais" onClick={() => setIsMenuOpen(false)}>Encontrar profissional</a>
          <button className="nav-provider" onClick={openSignup}>Quero oferecer meu serviço <ArrowRight size={16} /></button>
        </nav>
        <button className="menu-toggle" aria-label="Abrir menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> Serviço bom começa com confiança</div>
            <h1>Encontre quem<br /><em>resolve.</em></h1>
            <p>Profissionais verificados para deixar a sua rotina mais leve, do reparo urgente à reforma dos sonhos.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })}>Encontrar um profissional <ArrowRight size={18} /></button>
              <span className="trusted-by"><span className="avatar-stack"><i>J</i><i>M</i><i>C</i></span> +2 mil pessoas já encontraram</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Profissional trabalhando em um ambiente residencial">
            <div className="art-circle" />
            <div className="art-note"><ShieldCheck size={17} /><span><strong>Profissionais verificados</strong><br />gente de confiança, sempre</span></div>
            <div className="art-image"><img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=88" alt="Profissional realizando reparo em uma cozinha" /></div>
            <div className="art-label">mão na massa <span>↗</span></div>
          </div>
        </section>

        <section className="search-panel" aria-label="Buscar profissionais">
          <div className="search-field search-service"><Search size={20} /><div><label>O que você precisa?</label><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Ex: instalar chuveiro" /></div></div>
          <div className="search-divider" />
          <label className="search-field location-select"><MapPin size={20} /><div><span>Onde?</span><select value={location} onChange={(event) => setLocation(event.target.value)} aria-label="Cidade de atendimento">{serviceCities.map((city) => <option key={city} value={city}>{city}{city !== 'Todas as cidades' ? ', RS' : ''}</option>)}</select></div><ChevronDown size={17} /></label>
          <button className="search-button" onClick={handleSearch}><Search size={18} /> Buscar agora</button>
        </section>

        <section className="category-section" id="profissionais">
          <div className="section-heading"><div><span className="overline">Explore por categoria</span><h2>Qual é a sua demanda?</h2></div><a href="#results">Ver todas <ArrowRight size={16} /></a></div>
          <div className="category-list">{categories.map((category) => <button key={category.label} className={`category-pill ${activeCategory === category.label ? 'active' : ''}`} onClick={() => setActiveCategory(category.label)}><span>{category.icon}</span>{category.label}</button>)}</div>
        </section>

        <section className="results-section" id="results">
          <div className="section-heading results-heading"><div><span className="overline">{hasSearched ? 'Resultados para você' : 'Perto de você'}</span><h2>Profissionais em destaque <span className="result-count">{visibleProfessionals.length}</span></h2></div><button className="filter-button"><span>Filtros</span><ChevronDown size={16} /></button></div>
          {visibleProfessionals.length > 0 ? <div className="professional-grid">{visibleProfessionals.map((professional) => <article className="professional-card" key={professional.id}>
            <div className="card-photo"><img src={professional.image} alt={`${professional.name}, ${professional.role}`} /><button className={`favorite-button ${favorites.includes(professional.id) ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(professional.id)} aria-label={favorites.includes(professional.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}><Heart size={19} fill={favorites.includes(professional.id) ? 'currentColor' : 'none'} /></button>{professional.featured && <span className="featured-tag">Destaque</span>}</div>
            <div className="card-content"><div className="professional-name"><div className="mini-avatar" style={{ backgroundColor: professional.color }}>{professional.initials}</div><div><h3>{professional.name}</h3><span>{professional.role}</span></div></div><div className="location-line"><MapPin size={14} /> {professional.location}</div><div className="card-footer"><span className="rating"><Star size={15} fill="currentColor" /> <strong>{professional.rating}</strong> <small>({professional.reviews})</small></span><span className="price">{professional.price}</span></div><button className="profile-button" onClick={() => setSelectedProfessional(professional)}>Ver perfil <ArrowRight size={14} /></button></div>
          </article>)}</div> : <div className="empty-state"><span>⌁</span><h3>Nenhum profissional encontrado</h3><p>Tente outra busca ou escolha uma categoria diferente.</p><button onClick={() => { setSearchTerm(''); setActiveCategory('Todos') }}>Limpar busca</button></div>}
        </section>

        <section className="trust-section" id="como-funciona"><div className="trust-visual"><div className="trust-line" /><div className="trust-stat"><strong>4.9</strong><span><Star size={15} fill="currentColor" /> média de avaliação</span></div></div><div className="trust-copy"><span className="overline">Por que a mão certa?</span><h2>Menos procura.<br /><em>Mais certeza.</em></h2><p>A gente cuida dos detalhes para você contratar sem medo. Cada profissional passa por uma análise de perfil e é avaliado por quem já contratou.</p><div className="trust-points"><span><Check size={16} /> Perfis verificados</span><span><Check size={16} /> Avaliações reais</span><span><Check size={16} /> Orçamento sem compromisso</span></div></div></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark"><span /></span><span>mão <strong>certa</strong></span></a><p>Serviços que resolvem.<br />Do seu jeito.</p></div><div className="footer-links"><a href="#como-funciona">Sobre a mão certa</a><a href="#profissionais">Para clientes</a><button onClick={openSignup}>Para profissionais</button></div><span className="copyright">© 2026 mão certa</span></footer>

      {isSignupOpen && <div className="modal-backdrop" role="presentation" onClick={() => setIsSignupOpen(false)}><div className="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signup-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setIsSignupOpen(false)} aria-label="Fechar"><X size={20} /></button><span className="modal-icon"><Users size={21} /></span>{signupSent ? <div className="signup-success"><span className="success-icon"><Check size={23} /></span><span className="overline">Cadastro recebido</span><h2 id="signup-title">Obrigado, {signupData.name.split(' ')[0] || 'profissional'}.</h2><p>Seu perfil foi enviado para análise. Em breve entraremos em contato pelo e-mail informado.</p><button className="primary-button" onClick={() => setIsSignupOpen(false)}>Fechar cadastro <Check size={17} /></button></div> : <><span className="overline">Faça parte da nossa rede</span><h2 id="signup-title">Seu talento merece<br /><em>ser encontrado.</em></h2><p>Conte um pouco sobre o seu trabalho para encontrarmos clientes que precisam de você.</p><form onSubmit={handleSignup}><div className="signup-fields"><label>Nome completo<input required value={signupData.name} onChange={(event) => updateSignup('name', event.target.value)} placeholder="Ex: João da Silva" /></label><label>E-mail<input required type="email" value={signupData.email} onChange={(event) => updateSignup('email', event.target.value)} placeholder="voce@email.com" /></label><label>WhatsApp<input required type="tel" value={signupData.phone} onChange={(event) => updateSignup('phone', event.target.value)} placeholder="(11) 99999-9999" /></label><label>Serviço principal<select required value={signupData.category} onChange={(event) => updateSignup('category', event.target.value)}><option value="">Selecione uma categoria</option>{categories.slice(1).map((category) => <option key={category.label} value={category.label}>{category.label}</option>)}</select></label><label className="signup-wide">Cidade e estado<input required value={signupData.city} onChange={(event) => updateSignup('city', event.target.value)} placeholder="Ex: São Paulo, SP" /></label><label className="signup-wide">Sobre o seu trabalho<textarea required minLength={20} value={signupData.description} onChange={(event) => updateSignup('description', event.target.value)} placeholder="Descreva sua experiência e os serviços que oferece" rows={4} /></label></div><button className="primary-button" type="submit">Enviar meu cadastro <ArrowRight size={17} /></button></form></>}</div></div>}
    </div>
  )
}

export default App
