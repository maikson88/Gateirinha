import React, { useState, useRef, useEffect } from 'react';
import { Download, Plus, Trash2, Upload, PawPrint, Instagram, Syringe, Info } from 'lucide-react';

const App = () => {
  const [formData, setFormData] = useState({
    nome: '',
    raca: '',
    pelagem: '',
    nascimento: '',
    idade: '',
    sexo: 'Fêmea',
    microchip: 'Não Possui',
    servo: '', 
    contato: '',
    rg: '', 
    instagram: '',
    foto: null
  });

  const [vacinas, setVacinas] = useState([
    { nome: 'V4 (Quádrupla)', data: '20/01/2024' },
    { nome: 'Antirrábica', data: '15/02/2024' }
  ]);

  const [loadingLib, setLoadingLib] = useState(true);
  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = () => setLoadingLib(false);
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&family=Roboto+Condensed:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addVacina = () => {
    setVacinas([...vacinas, { nome: '', data: '' }]);
  };

  const removeVacina = (index) => {
    const newVacinas = vacinas.filter((_, i) => i !== index);
    setVacinas(newVacinas);
  };

  const updateVacina = (index, field, value) => {
    const newVacinas = [...vacinas];
    newVacinas[index][field] = value;
    setVacinas(newVacinas);
  };

  const downloadCard = async (ref, fileName) => {
    if (!window.html2canvas) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await window.html2canvas(ref.current, {
        scale: 4, 
        useCORS: true,
        backgroundColor: null,
        logging: false,
        letterRendering: 1, 
        allowTaint: true,
        onclone: (clonedDoc) => {
            const elements = clonedDoc.querySelectorAll('.data-value, .vacina-text');
            elements.forEach(el => {
                el.style.overflow = 'visible';
                el.style.whiteSpace = 'nowrap';
                el.style.lineHeight = '1.1'; // Ajuste fino para evitar pulo de linha
                el.style.paddingTop = '2px';
            });

            // Ajuste específico para o título (Nome do Gato)
            const titleEl = clonedDoc.querySelector('.cat-name-title');
            if(titleEl) {
               titleEl.style.lineHeight = '1.16';
               titleEl.style.marginBottom = '6px';
               titleEl.style.paddingBottom = '6px';
               titleEl.style.overflow = 'visible';
            }
            
            const fontElements = clonedDoc.querySelectorAll('.font-oswald, .font-condensed');
            fontElements.forEach(el => {
                el.style.fontVariant = 'normal';
            });

            const stripedHeaders = clonedDoc.querySelectorAll('.card-stripe-header');
            stripedHeaders.forEach((header) => {
                header.style.backgroundColor = '#047857';
                header.style.backgroundImage = 'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.16), transparent 38%), radial-gradient(circle at 80% 18%, rgba(255,255,255,0.12), transparent 35%), linear-gradient(120deg, #065f46 0%, #047857 52%, #0f766e 100%)';
                header.style.backgroundSize = 'auto, auto, 100% 100%';
                header.style.backgroundRepeat = 'no-repeat';
                header.style.backgroundPosition = 'left top, right top, center';
            });

            const headerPills = clonedDoc.querySelectorAll('.header-pill');
            headerPills.forEach((pill) => {
                pill.style.display = 'flex';
                pill.style.alignItems = 'center';
                pill.style.justifyContent = 'center';
                pill.style.lineHeight = '1';
                pill.style.paddingTop = '0';
                pill.style.paddingBottom = '0';
                pill.style.minHeight = '32px';
                pill.style.transform = 'none';

                const pillChildren = pill.querySelectorAll('*');
                pillChildren.forEach((child) => {
                    child.style.display = 'inline-flex';
                    child.style.alignItems = 'center';
                    child.style.lineHeight = '1';
                    child.style.marginTop = '0';
                    child.style.marginBottom = '0';
                    child.style.transform = 'none';
                });
            });

            const explicitCenteredTexts = clonedDoc.querySelectorAll('.header-pill-text, .card-footer-text');
            explicitCenteredTexts.forEach((node) => {
                node.style.display = 'inline-flex';
                node.style.alignItems = 'center';
                node.style.justifyContent = 'center';
                node.style.height = '100%';
                node.style.lineHeight = '1';
                node.style.marginTop = '0';
                node.style.marginBottom = '0';
                node.style.transform = 'translateY(-5px)';
            });

            const footerTexts = clonedDoc.querySelectorAll('.card-footer-rg, .card-footer-validity');
            footerTexts.forEach((text) => {
                text.style.lineHeight = '1';
                text.style.display = 'flex';
                text.style.alignItems = 'center';
                text.style.justifyContent = 'center';
                text.style.paddingTop = '0';
                text.style.paddingBottom = '0';
                text.style.marginTop = '0';
                text.style.marginBottom = '0';
                text.style.height = '100%';
                text.style.transform = 'none';

                const footerChildren = text.querySelectorAll('*');
                footerChildren.forEach((child) => {
                    child.style.display = 'inline-flex';
                    child.style.alignItems = 'center';
                    child.style.lineHeight = '1';
                    child.style.marginTop = '0';
                    child.style.marginBottom = '0';
                    child.style.transform = 'none';
                });
            });
        }
      });
      
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Erro ao gerar imagem", err);
      alert("Houve um erro ao gerar a imagem. Tente novamente.");
    }
  };

  const pawPattern = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310b981' fill-opacity='0.08' fill-rule='evenodd' transform='rotate(-45, 30, 30)'%3E%3Cpath d='M10,10 C12,10 13,12 13,14 C13,16 12,18 10,18 C8,18 7,16 7,14 C7,12 8,10 10,10 Z M20,6 C22,6 23,8 23,10 C23,12 22,14 20,14 C18,14 17,12 17,10 C17,8 18,6 20,6 Z M30,10 C32,10 33,12 33,14 C33,16 32,18 30,18 C28,18 27,16 27,14 C27,12 28,10 30,10 Z M20,20 C24,20 26,23 26,26 C26,29 24,32 20,32 C16,32 14,29 14,26 C14,23 16,20 20,20 Z' transform='translate(10, 10)'/%3E%3C/g%3E%3C/svg%3E`;
  // Header com gradientes suaves para evitar artefatos no preview e no PNG
  const headerStripeStyle = {
    backgroundColor: '#047857',
    backgroundImage: 'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.16), transparent 38%), radial-gradient(circle at 80% 18%, rgba(255,255,255,0.12), transparent 35%), linear-gradient(120deg, #065f46 0%, #047857 52%, #0f766e 100%)',
    backgroundSize: 'auto, auto, 100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left top, right top, center',
    borderBottom: '2px solid #fbbf24'
  };

  const inputFieldClass = "w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition text-sm";
  const labelTextClass = "block text-xs font-bold text-gray-500 uppercase mb-1";
  const btnDownloadClass = "bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-4 rounded-full shadow-md transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const headerPillClass = "header-pill h-8 bg-emerald-900/95 px-5 rounded-full text-white text-[0.63rem] font-bold uppercase tracking-[0.1em] shadow-lg border border-emerald-400/50 flex items-center justify-center gap-2 leading-none";
  const cardFooterClass = "h-[12%] shrink-0 bg-emerald-900 flex items-center justify-between px-6 z-10 border-t-2 border-yellow-400";
  const cardFooterRgClass = "card-footer-rg text-white font-mono text-xs tracking-widest flex items-center h-full gap-2 font-bold leading-none";
  const cardFooterValidityClass = "card-footer-validity text-emerald-400/80 text-[0.5rem] uppercase tracking-wide font-bold leading-none flex items-center h-full";
  
  const cardLabelClass = "data-label block font-bold text-emerald-700 text-[0.45rem] mb-[1px] leading-none uppercase tracking-wide";
  const cardValueClass = "data-value font-bold block whitespace-nowrap text-[0.6rem] leading-none text-gray-800 uppercase";

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-slate-800">
      <style>{`
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-condensed { font-family: 'Roboto Condensed', sans-serif; }
      `}</style>

      <header className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-black text-emerald-800 flex items-center justify-center gap-3 mb-2" style={{ fontFamily: 'Oswald' }}>
          <PawPrint size={40} /> GATEIRINHA
        </h1>
        <p className="text-gray-600">O documento oficial da República Federativa dos Gatos</p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LADO ESQUERDO: FORMULÁRIO */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-emerald-800 border-b pb-2 mb-4 flex items-center gap-2">
            <Info size={20} /> Dados do Felino
          </h2>
          
           <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Foto do Gato</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                  {formData.foto ? (
                    <img src={formData.foto} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <PawPrint size={24} />
                    </div>
                  )}
                </div>
                <label className="cursor-pointer bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-medium hover:bg-emerald-100 transition flex items-center gap-2 text-sm">
                  <Upload size={16} /> Escolher Foto
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelTextClass}>Nome do Gato</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} className={inputFieldClass} placeholder="Ex: Luna" />
              </div>
              <div>
                <label className={labelTextClass}>RG (Registro Gatuno)</label>
                <input type="text" name="rg" value={formData.rg} onChange={handleInputChange} className={inputFieldClass} placeholder="CAT-001" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelTextClass}>Raça</label>
                <input type="text" name="raca" value={formData.raca} onChange={handleInputChange} className={inputFieldClass} placeholder="SRD" />
              </div>
              <div>
                <label className={labelTextClass}>Nascimento</label>
                <input type="text" name="nascimento" value={formData.nascimento} onChange={handleInputChange} className={inputFieldClass} placeholder="DD/MM/AAAA" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelTextClass}>Idade</label>
                <input type="text" name="idade" value={formData.idade} onChange={handleInputChange} className={inputFieldClass} placeholder="2 Anos" />
              </div>
              <div>
                <label className={labelTextClass}>Sexo</label>
                <select name="sexo" value={formData.sexo} onChange={handleInputChange} className={`${inputFieldClass} bg-white`}>
                  <option>Fêmea</option>
                  <option>Macho</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelTextClass}>Pelagem</label>
              <input type="text" name="pelagem" value={formData.pelagem} onChange={handleInputChange} className={inputFieldClass} placeholder="Preta com manchas brancas" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelTextClass}>Microchip</label>
                <input type="text" name="microchip" value={formData.microchip} onChange={handleInputChange} className={inputFieldClass} />
              </div>
              <div>
                <label className={labelTextClass}>Contato</label>
                <input type="text" name="contato" value={formData.contato} onChange={handleInputChange} className={inputFieldClass} placeholder="(11) 99999-0000" />
              </div>
            </div>

            <div>
              <label className={labelTextClass}>Servo Humano (Dono)</label>
              <input type="text" name="servo" value={formData.servo} onChange={handleInputChange} className={inputFieldClass} placeholder="Seu nome" />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-lg font-bold text-emerald-800 mb-3 flex items-center gap-2">
                <Syringe size={18} /> Vacinas
              </h3>
              {vacinas.map((vacina, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    placeholder="Nome da Vacina" 
                    className={`${inputFieldClass} flex-1`}
                    value={vacina.nome} 
                    onChange={(e) => updateVacina(index, 'nome', e.target.value)}
                  />
                  <input 
                    type="text" 
                    placeholder="Data" 
                    className={`${inputFieldClass} w-24`}
                    value={vacina.data} 
                    onChange={(e) => updateVacina(index, 'data', e.target.value)}
                  />
                  <button onClick={() => removeVacina(index)} className="text-red-400 hover:text-red-600 p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button onClick={addVacina} className="text-sm text-emerald-600 font-bold hover:underline flex items-center gap-1 mt-2">
                <Plus size={16} /> Adicionar Vacina
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100">
               <label className={`${labelTextClass} flex items-center gap-2`}>
                <Instagram size={14} /> Instagram do Dono (para QR Code)
               </label>
               <div className="flex bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 items-center">
                 <span className="text-gray-400 text-sm mr-1">@</span>
                 <input 
                    type="text" 
                    name="instagram" 
                    value={formData.instagram} 
                    onChange={handleInputChange} 
                    className="bg-transparent border-none outline-none w-full text-sm text-gray-700" 
                    placeholder="usuario.gatinho" 
                  />
               </div>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: PREVIEW */}
        <div className="lg:col-span-7 space-y-8 flex flex-col items-center">
          
          {/* FRENTE DO CARTÃO */}
          <div className="w-full max-w-[500px]">
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Frente</h3>
              <button 
                onClick={() => downloadCard(frontCardRef, 'gateirinha-frente')} 
                disabled={loadingLib}
                className={btnDownloadClass}
              >
                <Download size={16} /> Baixar Frente
              </button>
            </div>
            
            <div 
              ref={frontCardRef} 
              className="aspect-[1.586/1] w-full bg-white rounded-xl shadow-2xl overflow-hidden relative border border-gray-200 select-none text-[#0f3d30] flex flex-col"
              style={{ backgroundImage: `url("${pawPattern}")`, backgroundColor: '#fff' }}
            >
              {/* Header Listrado Corrigido */}
              <div 
                className="card-stripe-header h-[18%] shrink-0 w-full flex items-center justify-center relative z-10"
                style={headerStripeStyle}
              >
                 {/* Container do Texto Centralizado Verticalmente */}
                 <div className="flex items-center justify-center h-full w-full">
                   <div className={headerPillClass}>
                      <span className="font-condensed inline-flex items-center gap-1 leading-none">
                        <span className="header-pill-text text-yellow-400 text-[0.8rem] leading-none">★</span>
                        <span className="header-pill-text leading-none">República Federativa dos Gatos</span>
                      </span>
                      <span className="h-3 w-[1px] bg-emerald-500/50"></span>
                      <span className="header-pill-text font-condensed text-emerald-200 leading-none">Registro Gatuno</span>
                   </div>
                 </div>
              </div>

              {/* Corpo Principal */}
              <div className="flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-black/5 to-transparent z-0"></div>

                <div className="flex-1 flex items-center justify-center px-6 py-2 relative z-10">
                  <div className="w-full flex gap-5 items-center justify-center">
                    
                    {/* Coluna Esquerda: Foto + Assinatura */}
                    <div className="flex flex-col items-center gap-3 shrink-0 w-[24%]">
                      {/* Foto Box */}
                      <div className="w-full aspect-[3/4] bg-white border-2 border-emerald-800 rounded-lg p-1 shadow-md relative group">
                         <div className="w-full h-full bg-gray-100 overflow-hidden rounded-md relative flex items-center justify-center">
                            {formData.foto ? (
                               <img src={formData.foto} className="w-full h-full object-cover" alt="Gato" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-emerald-800/30">
                                <span className="text-4xl font-bold font-oswald opacity-50">
                                  {formData.nome ? formData.nome.charAt(0).toUpperCase() : '?'}
                                </span>
                              </div>
                            )}
                         </div>
                      </div>
                      
                      {/* Assinatura Corrigida */}
                      <div className="text-center w-full mt-0.5 px-1">
                         <div className="mx-auto w-[84%] h-[1.5px] bg-emerald-900/80 relative mb-1"></div>
                         <div className="text-[0.4rem] font-bold text-emerald-800 uppercase tracking-[0.06em] leading-none">Assinatura da Patinha</div>
                         {/* Patinha Decorativa */}
                         <div className="absolute -top-[2.2rem] left-1/2 -translate-x-1/2 opacity-70 pointer-events-none">
                            <PawPrint size={14} className="text-emerald-900 rotate-[-10deg]" />
                         </div>
                      </div>
                    </div>

                    {/* Coluna Direita: Dados */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center h-full py-1.5">
                      <div className="cat-name-title text-[1.62rem] font-bold uppercase text-emerald-900 mb-1 font-oswald tracking-tight pb-[7px] whitespace-nowrap leading-[1.2]">
                        {formData.nome || "NOME DO GATO"}
                      </div>
                      
                      <div className="w-full h-0.5 bg-emerald-500 mb-2 mt-0.5 opacity-50"></div>

                      <div className="grid grid-cols-2 gap-x-2.5 gap-y-1.5 text-[0.58rem] uppercase">
                         <div>
                           <span className={cardLabelClass}>Espécie</span>
                           <span className={cardValueClass}>Felis Catus</span>
                         </div>
                         <div>
                            <span className={cardLabelClass}>Sexo</span>
                            <span className={cardValueClass}>{formData.sexo}</span>
                         </div>

                         <div>
                           <span className={cardLabelClass}>Raça</span>
                           <span className={cardValueClass}>{formData.raca || "SRD"}</span>
                         </div>
                         <div>
                           <span className={cardLabelClass}>Pelagem</span>
                           <span className={cardValueClass}>{formData.pelagem || "-"}</span>
                         </div>

                         <div>
                           <span className={cardLabelClass}>Nascimento</span>
                           <span className={cardValueClass}>{formData.nascimento || "--/--/----"}</span>
                         </div>
                          <div>
                           <span className={cardLabelClass}>Idade</span>
                           <span className={cardValueClass}>{formData.idade || "-"}</span>
                         </div>

                         <div className="col-span-2">
                           <span className={cardLabelClass}>Microchip</span>
                           <span className={cardValueClass}>{formData.microchip}</span>
                         </div>

                         <div className="col-span-1">
                           <span className={cardLabelClass}>Servo Humano</span>
                           <span className={cardValueClass}>{formData.servo || "HUMANO"}</span>
                         </div>
                         <div className="col-span-1">
                           <span className={cardLabelClass}>Contato</span>
                           <span className={cardValueClass}>{formData.contato || "-"}</span>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer RG */}
                <div className={cardFooterClass}>
                    <div className={cardFooterRgClass}>
                      <span className="card-footer-text text-emerald-300">RG:</span>
                      <span className="card-footer-text">{formData.rg || "CATLUNA001"}</span>
                    </div>
                    <div className={cardFooterValidityClass}>
                      <span className="card-footer-text">Válido em todo território felino</span>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* VERSO DO CARTÃO */}
          <div className="w-full max-w-[500px]">
             <div className="flex justify-between items-end mb-2">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Verso</h3>
              <button 
                onClick={() => downloadCard(backCardRef, 'gateirinha-verso')} 
                disabled={loadingLib}
                className={btnDownloadClass}
              >
                <Download size={16} /> Baixar Verso
              </button>
            </div>

            <div 
              ref={backCardRef} 
              className="aspect-[1.586/1] w-full bg-emerald-50 rounded-xl shadow-2xl overflow-hidden relative border border-gray-200 select-none flex flex-col"
              style={{ backgroundImage: `url("${pawPattern}")`, backgroundColor: '#f0fdf4' }}
            >
              {/* Header Verso Listrado */}
              <div 
                className="card-stripe-header h-[18%] shrink-0 w-full flex items-center justify-center relative z-10"
                style={headerStripeStyle}
              >
                <div className={headerPillClass}>
                  <span className="header-pill-text">Histórico de Vacinação & Cuidados</span>
                </div>
              </div>

              <div className="flex-1 p-4 relative flex flex-col overflow-hidden min-h-0">
                {/* Lista de Vacinas Ajustada */}
                <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                  <h4 className="flex items-center gap-2 text-[0.6rem] font-bold text-emerald-800 uppercase mb-2 border-b-2 border-emerald-200 pb-1 shrink-0 tracking-wide">
                    <Syringe size={10} className="text-emerald-600" />
                    Registro de Imunização ({vacinas.length})
                  </h4>

                  <div className="overflow-y-auto pr-1">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                      {vacinas.slice(0, 8).map((vacina, i) => (
                        <div key={i} className="flex justify-between items-center text-[0.5rem] bg-white/90 px-2 py-1.5 rounded border border-emerald-100 shadow-sm">
                          <span className="vacina-text font-bold text-gray-800 truncate max-w-[65%]" title={vacina.nome}>{vacina.nome || "Vacina"}</span>
                          <span className="vacina-text font-mono text-emerald-700 font-bold tracking-tight">{vacina.data || "--/--"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-2 shrink-0 pt-2 border-t border-emerald-200/80">
                  <div className="flex items-center justify-between text-[0.48rem] text-emerald-900 font-bold uppercase tracking-wide mb-1">
                    <span>Tutor: {formData.servo || 'Humano Responsável'}</span>
                    <span>Emissão: {new Date().toLocaleDateString()}</span>
                  </div>
                  <p className="text-[0.44rem] text-emerald-800/80 leading-tight">
                    Documento válido para controle de vacinação, identificação e recebimento oficial de cafunés.
                  </p>
                </div>
              </div>

              <div className={cardFooterClass}>
                  <div className={cardFooterRgClass}>
                    <span className="card-footer-text text-emerald-300">RG:</span>
                    <span className="card-footer-text">{formData.rg || "CATLUNA001"}</span>
                  </div>
                  <div className={cardFooterValidityClass}>
                    <span className="card-footer-text">Válido em todo território felino</span>
                  </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
