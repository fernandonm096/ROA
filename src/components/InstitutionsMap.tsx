import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { ArrowUpRight, ExternalLink, MapPin, ShieldCheck } from 'lucide-react';
import type { Institution } from '../types/roa';

interface InstitutionsMapProps {
  institutions: Institution[];
  onSelectInstitution: (institution: Institution) => void;
}

/**
 * Mapa interactivo de instituciones en Santa Fe Capital utilizando Leaflet + OpenStreetMap ($0).
 * Se sincroniza automáticamente con los filtros del directorio e incluye un listado accesible
 * lateral para centrar y abrir cada institución sin depender únicamente del puntero.
 */
export function InstitutionsMap({
  institutions,
  onSelectInstitution,
}: InstitutionsMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [activeId, setActiveId] = useState<string>(institutions[0]?.id ?? '');
  const [tileWarning, setTileWarning] = useState(false);

  const activeInstitution =
    institutions.find((inst) => inst.id === activeId) ?? institutions[0] ?? null;

  useEffect(() => {
    if (institutions.length > 0 && !institutions.some((i) => i.id === activeId)) {
      setActiveId(institutions[0].id);
    }
  }, [institutions, activeId]);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-31.633, -60.698],
      zoom: 13,
      scrollWheelZoom: false,
    });

    const tileLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }
    );

    tileLayer.on('tileerror', () => {
      setTileWarning(true);
    });

    tileLayer.addTo(map);
    const markersLayer = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = markersLayer;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  const institutionsRef = useRef(institutions);
  institutionsRef.current = institutions;

  useEffect(() => {
    const map = mapInstanceRef.current;
    const container = mapContainerRef.current;
    if (!map || !container) return;

    const fitActiveBounds = () => {
      const current = institutionsRef.current;
      if (current.length === 0) return;
      if (current.length === 1) {
        map.setView(
          [current[0].coordinates.lat, current[0].coordinates.lng],
          15,
          { animate: false }
        );
        return;
      }
      const bounds = L.latLngBounds(
        current.map((inst) => [inst.coordinates.lat, inst.coordinates.lng])
      );
      if (bounds.isValid()) {
        map.fitBounds(bounds, {
          paddingTopLeft: [40, 48],
          paddingBottomRight: [96, 48],
          maxZoom: 13,
          animate: false,
        });
      }
    };

    const observer = new ResizeObserver(() => {
      map.invalidateSize({ pan: false });
      fitActiveBounds();
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    if (institutions.length === 0) return;

    institutions.forEach((inst) => {
      const { lat, lng } = inst.coordinates;
      const isFocused = inst.id === activeInstitution?.id;

      const icon = L.divIcon({
        className: 'roa-custom-marker',
        html: `<div style="
          display:inline-flex;
          align-items:center;
          gap:4px;
          padding:4px 9px;
          border-radius:8px;
          font-family:'IBM Plex Mono',monospace;
          font-size:11px;
          font-weight:600;
          white-space:nowrap;
          border:1.5px solid ${isFocused ? '#38BDF8' : '#FFFFFF'};
          background:${isFocused ? '#0369A1' : '#0F2942'};
          color:#FFFFFF;
          box-shadow:0 4px 10px rgba(15,23,42,0.28);
        ">${inst.acronym}</div>`,
        iconSize: [0, 0],
        iconAnchor: [24, 14],
      });

      const marker = L.marker([lat, lng], { icon }).addTo(layer);
      marker.bindTooltip(`${inst.officialName} — ${inst.address}`, {
        direction: 'top',
        offset: [0, -14],
      });

      marker.on('click', () => {
        setActiveId(inst.id);
      });
    });
  }, [institutions, activeInstitution?.id]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || institutions.length === 0) return;

    if (institutions.length === 1) {
      map.setView(
        [institutions[0].coordinates.lat, institutions[0].coordinates.lng],
        15,
        { animate: false }
      );
      return;
    }

    const bounds = L.latLngBounds(
      institutions.map((inst) => [inst.coordinates.lat, inst.coordinates.lng])
    );
    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        paddingTopLeft: [40, 48],
        paddingBottomRight: [96, 48],
        maxZoom: 13,
        animate: false,
      });
    }
  }, [institutions]);

  const handleFocusInstitution = (inst: Institution) => {
    setActiveId(inst.id);
    const map = mapInstanceRef.current;
    if (map) {
      map.invalidateSize({ pan: false });
      map.setView([inst.coordinates.lat, inst.coordinates.lng], 15, {
        animate: true,
      });
    }
  };

  return (
    <div
      id="mapa-instituciones"
      data-testid="institutions-map-section"
      className="mt-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
    >
      {/* Cabecera del mapa */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#F8FAFC] dark:bg-slate-900">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-[#0F2942] dark:text-slate-100">
            Mapa de instituciones en Santa Fe Capital
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Ubicación referencial sincronizada con los filtros activos (OpenStreetMap).
          </p>
        </div>
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
          {institutions.length}{' '}
          {institutions.length === 1 ? 'marcador activo' : 'marcadores activos'}
        </span>
      </div>

      {institutions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Lienzo del mapa Leaflet */}
          <div className="lg:col-span-8 relative border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
            <div
              ref={mapContainerRef}
              data-testid="leaflet-map-container"
              className="roa-leaflet-map w-full h-[320px] sm:h-[400px] lg:h-[430px] bg-slate-100 dark:bg-slate-900 z-0"
              aria-label="Mapa interactivo de instituciones educativas en Santa Fe Capital"
            />
            {tileWarning && (
              <div className="absolute bottom-3 left-3 right-3 z-[400] bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-600 dark:text-slate-300">
                Los mapas base externos no cargaron en esta red; los marcadores y el
                listado lateral siguen activos con coordenadas de referencia.
              </div>
            )}
          </div>

          {/* Panel lateral accesible de marcadores y ficha rápida */}
          <div className="lg:col-span-4 p-4 sm:p-5 flex flex-col justify-between gap-4 bg-white dark:bg-[#111827]">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Seleccionar marcador en el mapa
              </p>
              <div className="space-y-1.5">
                {institutions.map((inst) => {
                  const isFocused = inst.id === activeInstitution?.id;
                  return (
                    <button
                      key={inst.id}
                      type="button"
                      onClick={() => handleFocusInstitution(inst)}
                      aria-pressed={isFocused}
                      className={`w-full min-h-[44px] px-3 py-2 rounded-lg border text-left transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                        isFocused
                          ? 'bg-[#0F2942] dark:bg-sky-600 text-white border-[#0F2942] dark:border-sky-600'
                          : 'bg-[#F8FAFC] dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <span className="text-xs font-semibold truncate">
                        {inst.acronym} · {inst.neighborhood}
                      </span>
                      <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>

            {activeInstitution && (
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-[#F8FAFC] dark:bg-slate-900 space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-mono text-[#0369A1] dark:text-sky-400">
                    {activeInstitution.acronym} · {activeInstitution.management}
                  </p>
                  <h4 className="text-sm font-semibold text-[#0F2942] dark:text-slate-100 leading-snug">
                    {activeInstitution.officialName}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {activeInstitution.address}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {activeInstitution.coordinates.precisionNote}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <ShieldCheck
                    className="w-4 h-4 text-[#047857] dark:text-emerald-400 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Validación: {activeInstitution.validationSource}</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectInstitution(activeInstitution)}
                    className="flex-1 min-h-[40px] inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#0F2942] dark:bg-sky-600 rounded-lg hover:bg-[#193C5E] dark:hover:bg-sky-500 transition-colors cursor-pointer"
                  >
                    <span>Ver ficha</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <a
                    href={activeInstitution.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[40px] inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <span>Maps</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-sm text-slate-600 dark:text-slate-400">
          No hay instituciones para mostrar en el mapa con los filtros actuales.
        </div>
      )}
    </div>
  );
}
