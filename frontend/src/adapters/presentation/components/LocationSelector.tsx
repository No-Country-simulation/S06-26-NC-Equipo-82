import { getContinents, getCountries, getStates, getCities } from "../../../core/domain/locationData"

export interface LocationValue {
    continente: string
    pais: string
    estado: string
    ciudad: string
}

interface LocationSelectorProps {
    value: LocationValue
    onChange: (value: LocationValue) => void
}

const selectClass =
    "border border-gray-300 rounded-lg p-2.5 text-sm sm:text-base w-full bg-white " +
    "focus:outline-none focus:ring-2 focus:ring-[#00BFFF] focus:border-transparent transition " +
    "disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"

const LocationSelector = ({ value, onChange }: LocationSelectorProps) => {
    const continents = getContinents()
    const countries = getCountries(value.continente)
    const states = getStates(value.continente, value.pais)
    const cities = getCities(value.continente, value.pais, value.estado)

    const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({ continente: e.target.value, pais: "", estado: "", ciudad: "" })
    }

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({ ...value, pais: e.target.value, estado: "", ciudad: "" })
    }

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({ ...value, estado: e.target.value, ciudad: "" })
    }

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({ ...value, ciudad: e.target.value })
    }

    return (
        <div className="flex flex-col gap-3">

            {/* Continente */}
            <div className="flex flex-col gap-1">
                <label htmlFor="continente" className="text-sm font-medium text-gray-700">
                    Continente <span className="text-red-500">*</span>
                </label>
                <select
                    id="continente"
                    name="continente"
                    value={value.continente}
                    onChange={handleContinentChange}
                    className={selectClass}
                    required
                >
                    <option value="">— Selecciona un continente —</option>
                    {continents.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* País */}
            <div className="flex flex-col gap-1">
                <label htmlFor="pais" className="text-sm font-medium text-gray-700">
                    País <span className="text-red-500">*</span>
                    {!value.continente && (
                        <span className="text-xs text-gray-400 font-normal ml-1">(selecciona un continente)</span>
                    )}
                </label>
                <select
                    id="pais"
                    name="pais"
                    value={value.pais}
                    onChange={handleCountryChange}
                    disabled={!value.continente}
                    className={selectClass}
                    required
                >
                    <option value="">— Selecciona un país —</option>
                    {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* Estado / Provincia */}
            <div className="flex flex-col gap-1">
                <label htmlFor="estado" className="text-sm font-medium text-gray-700">
                    Estado / Provincia <span className="text-red-500">*</span>
                    {!value.pais && (
                        <span className="text-xs text-gray-400 font-normal ml-1">(selecciona un país)</span>
                    )}
                </label>
                <select
                    id="estado"
                    name="estado"
                    value={value.estado}
                    onChange={handleStateChange}
                    disabled={!value.pais}
                    className={selectClass}
                    required
                >
                    <option value="">— Selecciona un estado —</option>
                    {states.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* Ciudad */}
            <div className="flex flex-col gap-1">
                <label htmlFor="ciudad" className="text-sm font-medium text-gray-700">
                    Ciudad <span className="text-red-500">*</span>
                    {!value.estado && (
                        <span className="text-xs text-gray-400 font-normal ml-1">(selecciona un estado)</span>
                    )}
                </label>
                <select
                    id="ciudad"
                    name="ciudad"
                    value={value.ciudad}
                    onChange={handleCityChange}
                    disabled={!value.estado}
                    className={selectClass}
                    required
                >
                    <option value="">— Selecciona una ciudad —</option>
                    {cities.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

        </div>
    )
}

export default LocationSelector
