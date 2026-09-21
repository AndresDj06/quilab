<?php

namespace Database\Seeders;

use App\Enums\ProjectStatus;
use App\Enums\UserRole;
use App\Models\Category;
use App\Models\ContactMessage;
use App\Models\Member;
use App\Models\Project;
use App\Models\Technology;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->users();
        $categories = $this->categories();
        $technologies = $this->technologies();
        $members = $this->members($technologies);
        $this->projects($categories, $technologies, $members);
        $this->messages();
    }

    private function users(): void
    {
        $accounts = [
            ['name' => 'Andrés Rivas', 'email' => 'super@quilab.dev', 'role' => UserRole::SuperAdmin],
            ['name' => 'Marina Soler', 'email' => 'admin@quilab.dev', 'role' => UserRole::Admin],
            ['name' => 'Nicolás Vidal', 'email' => 'editor@quilab.dev', 'role' => UserRole::Editor],
        ];

        foreach ($accounts as $account) {
            User::query()->updateOrCreate(
                ['email' => $account['email']],
                [
                    'name' => $account['name'],
                    'password' => Hash::make('password'),
                    'role' => $account['role'],
                    'status' => 'active',
                    'email_verified_at' => now(),
                ]
            );
        }
    }

    /** @return array<string, Category> */
    private function categories(): array
    {
        $items = [
            ['name' => 'Plataformas web', 'slug' => 'plataformas-web', 'description' => 'Productos digitales de alto tráfico y operación continua.'],
            ['name' => 'Sistemas empresariales', 'slug' => 'sistemas-empresariales', 'description' => 'Software interno para operación, control y escala.'],
            ['name' => 'Producto móvil', 'slug' => 'producto-movil', 'description' => 'Experiencias nativas e híbridas para campo y cliente.'],
            ['name' => 'Datos e inteligencia', 'slug' => 'datos-inteligencia', 'description' => 'Modelos, automatización y decisión basada en datos.'],
        ];

        $map = [];
        foreach ($items as $index => $item) {
            $map[$item['slug']] = Category::query()->updateOrCreate(
                ['slug' => $item['slug']],
                [...$item, 'position' => $index + 1]
            );
        }

        return $map;
    }

    /** @return array<string, Technology> */
    private function technologies(): array
    {
        $items = [
            ['Laravel', 'backend'],
            ['React', 'frontend'],
            ['TypeScript', 'frontend'],
            ['MySQL', 'data'],
            ['PostgreSQL', 'data'],
            ['APIs', 'backend'],
            ['Cloud', 'infra'],
            ['React Native', 'mobile'],
            ['Python', 'data'],
            ['TensorFlow', 'ai'],
            ['Tailwind CSS', 'frontend'],
            ['Docker', 'infra'],
            ['Redis', 'infra'],
            ['Figma', 'design'],
            ['Node.js', 'backend'],
        ];

        $map = [];
        foreach ($items as $index => [$name, $area]) {
            $slug = \Illuminate\Support\Str::slug($name);
            $map[$slug] = Technology::query()->updateOrCreate(
                ['slug' => $slug],
                ['name' => $name, 'area' => $area, 'position' => $index + 1]
            );
        }

        return $map;
    }

    /** @param array<string, Technology> $technologies */
    private function members(array $technologies): array
    {
        $people = [
            [
                'first_name' => 'Andrés', 'last_name' => 'Rivas', 'role_title' => 'Software Engineer',
                'specialty' => 'React · Laravel · AI · Data', 'location' => 'Bogotá',
                'bio' => 'Diseña y construye productos de software de punta a punta. Coordina arquitectura, calidad y entrega en los proyectos de mayor complejidad del consorcio.',
                'linkedin' => 'https://www.linkedin.com/in/andres-rivas', 'github' => 'https://github.com/andresrivas',
                'tech' => ['react', 'laravel', 'mysql', 'apis', 'tensorflow'], 'featured' => true,
            ],
            [
                'first_name' => 'Laura', 'last_name' => 'Gómez', 'role_title' => 'UI/UX Designer',
                'specialty' => 'Sistemas de diseño · Investigación · Prototipo', 'location' => 'Medellín',
                'bio' => 'Traduce problemas operativos en interfaces precisas. Construye sistemas visuales que resisten escala y mantienen coherencia en productos complejos.',
                'linkedin' => 'https://www.linkedin.com/in/laura-gomez-diseno', 'github' => null,
                'tech' => ['figma', 'tailwind-css', 'react'], 'featured' => true,
            ],
            [
                'first_name' => 'Carlos', 'last_name' => 'Pérez', 'role_title' => 'Backend Developer',
                'specialty' => 'APIs · Dominio · Integraciones', 'location' => 'Cali',
                'bio' => 'Modela dominios de negocio y construye backends estables. Especialista en integraciones, consistencia de datos y contratos de API.',
                'linkedin' => 'https://www.linkedin.com/in/carlos-perez-backend', 'github' => 'https://github.com/cperez',
                'tech' => ['laravel', 'mysql', 'apis', 'redis'], 'featured' => false,
            ],
            [
                'first_name' => 'Valentina', 'last_name' => 'Ruiz', 'role_title' => 'Mobile Engineer',
                'specialty' => 'React Native · Offline-first', 'location' => 'Barranquilla',
                'bio' => 'Desarrolla aplicaciones móviles que operan en campo, con sincronización, rendimiento y una experiencia sobria.',
                'linkedin' => 'https://www.linkedin.com/in/valentina-ruiz', 'github' => 'https://github.com/vruiz',
                'tech' => ['react-native', 'typescript', 'apis'], 'featured' => false,
            ],
            [
                'first_name' => 'Mateo', 'last_name' => 'Herrera', 'role_title' => 'Data & AI Engineer',
                'specialty' => 'Modelos · Pipelines · Decisión', 'location' => 'Bogotá',
                'bio' => 'Convierte datos operativos en señales útiles. Diseña pipelines, modelos y paneles que alimentan decisiones reales.',
                'linkedin' => 'https://www.linkedin.com/in/mateo-herrera', 'github' => 'https://github.com/mherrera',
                'tech' => ['python', 'tensorflow', 'postgresql', 'cloud'], 'featured' => true,
            ],
            [
                'first_name' => 'Sofía', 'last_name' => 'Castro', 'role_title' => 'Product Lead',
                'specialty' => 'Descubrimiento · Entrega · Stakeholders', 'location' => 'Quito',
                'bio' => 'Ordena el trabajo entre negocio y ingeniería. Define alcance, prioriza y mantiene el ritmo de entrega sin diluir calidad.',
                'linkedin' => 'https://www.linkedin.com/in/sofia-castro', 'github' => null,
                'tech' => ['figma', 'react'], 'featured' => false,
            ],
            [
                'first_name' => 'Diego', 'last_name' => 'Vargas', 'role_title' => 'Cloud Engineer',
                'specialty' => 'Infraestructura · Observabilidad · CI/CD', 'location' => 'Lima',
                'bio' => 'Diseña entornos reproducibles y seguros. Automatiza despliegues, monitoreo y capacidad para que el software escale con calma.',
                'linkedin' => 'https://www.linkedin.com/in/diego-vargas', 'github' => 'https://github.com/dvargas',
                'tech' => ['docker', 'cloud', 'redis', 'nodejs'], 'featured' => false,
            ],
            [
                'first_name' => 'Camila', 'last_name' => 'Ortiz', 'role_title' => 'Quality Engineer',
                'specialty' => 'QA · Automatización · Resiliencia', 'location' => 'Santiago',
                'bio' => 'Protege la calidad del producto con criterios claros, pruebas automatizadas y una mirada de usuario real.',
                'linkedin' => 'https://www.linkedin.com/in/camila-ortiz', 'github' => 'https://github.com/cortiz',
                'tech' => ['typescript', 'apis', 'docker'], 'featured' => false,
            ],
        ];

        $map = [];
        foreach ($people as $index => $person) {
            $member = Member::query()->updateOrCreate(
                ['email' => strtolower($person['first_name'].'.'.$person['last_name']).'@quilab.dev'],
                [
                    'first_name' => $person['first_name'],
                    'last_name' => $person['last_name'],
                    'public_name' => $person['first_name'].' '.$person['last_name'],
                    'photo' => '/images/members/'.strtolower($person['first_name']).'.svg',
                    'role_title' => $person['role_title'],
                    'specialty' => $person['specialty'],
                    'bio' => $person['bio'],
                    'linkedin' => $person['linkedin'],
                    'github' => $person['github'],
                    'location' => $person['location'],
                    'status' => 'active',
                    'is_featured' => $person['featured'],
                    'position' => $index + 1,
                ]
            );
            $ids = collect($person['tech'])->map(fn ($slug) => $technologies[$slug]->id)->all();
            $member->technologies()->sync($ids);
            $map[$member->slug] = $member;
        }

        return $map;
    }

    private function projects(array $categories, array $technologies, array $members): void
    {
        $projects = [
            [
                'name' => 'Atlas Salud',
                'slug' => 'atlas-salud',
                'title' => 'Plataforma clínica para coordinación hospitalaria',
                'summary' => 'Un sistema que unifica admisión, historia y operación de camas en una red de clínicas regionales.',
                'description' => 'Atlas Salud nació para reemplazar procesos fragmentados entre sedes. Construimos un núcleo clínico con control de acceso por rol, trazabilidad y una interfaz que el personal médico puede usar en turnos de alta presión.',
                'problem' => 'Cada sede operaba con hojas de cálculo, sistemas heredados y canales informales. La información del paciente no viajaba con él y la ocupación se conocía con horas de retraso.',
                'solution' => 'Diseñamos un dominio clínico compartido, APIs internas y una aplicación web con flujos de admisión, evolución y alta. La operación de camas quedó visible en tiempo casi real para dirección médica.',
                'features' => ['Historia clínica unificada', 'Tablero de ocupación', 'Roles clínicos granulares', 'Integración con laboratorio', 'Auditoría de accesos'],
                'results' => [
                    ['label' => 'Tiempo de admisión', 'value' => '−38%'],
                    ['label' => 'Sedes conectadas', 'value' => '7'],
                    ['label' => 'Incidentes de datos', 'value' => '0 críticos'],
                ],
                'status' => ProjectStatus::Finished, 'year' => 2025, 'location' => 'Bogotá, Colombia',
                'client' => 'Red clínica privada', 'category' => 'sistemas-empresariales',
                'cover' => '/images/covers/atlas.svg', 'published' => true, 'featured' => true,
                'started_at' => '2024-03-01', 'finished_at' => '2025-06-30',
                'tech' => ['laravel', 'react', 'mysql', 'apis', 'cloud'],
                'team' => [
                    ['andres-rivas', 'Lead Developer', 'Arquitectura y núcleo clínico'],
                    ['carlos-perez', 'Backend Developer', 'Dominio e integraciones'],
                    ['laura-gomez', 'UI/UX Designer', 'Flujos clínicos'],
                    ['camila-ortiz', 'Quality Engineer', 'Criterios y regresiones'],
                ],
            ],
            [
                'name' => 'Nodo Logística',
                'slug' => 'nodo-logistica',
                'title' => 'Sistema de operaciones para cadena de suministro',
                'summary' => 'Control de flota, bodega y última milla en una sola capa operativa, con lectura en campo.',
                'description' => 'Nodo Logística es el sistema de control de una operación que mueve inventario entre centros regionales. El consorcio está construyendo el backend, el panel de torre de control y la app de conductores.',
                'problem' => 'La operación dependía de llamadas, grupos de mensajería y un ERP que no reflejaba el estado real de la ruta. Las excepciones se resolvían tarde y el cliente no tenía visibilidad.',
                'solution' => 'Estamos modelando eventos de ruta, inventario y excepciones. El panel muestra el estado de la red; la app móvil captura evidencia en campo incluso con conectividad intermitente.',
                'features' => ['Torre de control', 'App de conductores', 'Excepciones en ruta', 'Sincronización offline', 'Contratos de API con ERP'],
                'results' => [
                    ['label' => 'Rutas instrumentadas', 'value' => '120+'],
                    ['label' => 'Visibilidad', 'value' => 'Casi tiempo real'],
                    ['label' => 'Fase', 'value' => 'Piloto'],
                ],
                'status' => ProjectStatus::InProgress, 'year' => 2026, 'location' => 'Cali, Colombia',
                'client' => 'Operador logístico regional', 'category' => 'producto-movil',
                'cover' => '/images/covers/nodo.svg', 'published' => true, 'featured' => true,
                'started_at' => '2025-09-01', 'finished_at' => null,
                'tech' => ['laravel', 'react', 'react-native', 'postgresql', 'docker'],
                'team' => [
                    ['sofia-castro', 'Product Lead', 'Alcance y priorización'],
                    ['valentina-ruiz', 'Mobile Engineer', 'App de campo'],
                    ['diego-vargas', 'Cloud Engineer', 'Infraestructura y CI'],
                    ['carlos-perez', 'Backend Developer', 'Eventos y ERP'],
                ],
            ],
            [
                'name' => 'Cumbre Banca',
                'slug' => 'cumbre-banca',
                'title' => 'Onboarding digital para banca de personas',
                'summary' => 'Apertura de cuenta con verificación, cumplimiento y una experiencia contenida, sin fricción ornamental.',
                'description' => 'Cumbre Banca es un flujo de onboarding que reemplazó un proceso presencial de varios días. El trabajo cubrió identidad, riesgo, contratos y un backoffice de revisión humana.',
                'problem' => 'El banco perdía solicitudes en un proceso largo, con documentos físicos y criterios de cumplimiento que no estaban en el sistema. El abandono era alto y la auditoría, débil.',
                'solution' => 'Construimos un flujo guiado con capturas controladas, reglas de cumplimiento y una cola de revisión. Cada decisión quedó trazada. El canal digital se volvió el camino principal de apertura.',
                'features' => ['Verificación de identidad', 'Motor de reglas', 'Cola de cumplimiento', 'Firma de contratos', 'Backoffice de revisión'],
                'results' => [
                    ['label' => 'Tiempo de apertura', 'value' => '2 días → 18 min'],
                    ['label' => 'Aprobación digital', 'value' => '71%'],
                    ['label' => 'Auditorías', 'value' => 'Trazables'],
                ],
                'status' => ProjectStatus::Finished, 'year' => 2024, 'location' => 'Lima, Perú',
                'client' => 'Banco de personas', 'category' => 'plataformas-web',
                'cover' => '/images/covers/cumbre.svg', 'published' => true, 'featured' => false,
                'started_at' => '2023-08-01', 'finished_at' => '2024-11-15',
                'tech' => ['laravel', 'react', 'typescript', 'mysql', 'apis'],
                'team' => [
                    ['andres-rivas', 'Lead Developer', 'Arquitectura del flujo'],
                    ['laura-gomez', 'UI/UX Designer', 'Reducción de fricción'],
                    ['mateo-herrera', 'Data & AI Engineer', 'Señales de riesgo'],
                    ['camila-ortiz', 'Quality Engineer', 'Escenarios de cumplimiento'],
                ],
            ],
            [
                'name' => 'Linden Educa',
                'slug' => 'linden-educa',
                'title' => 'Campus digital para formación corporativa',
                'summary' => 'Una plataforma de aprendizaje para programas internos, con rutas, evidencia y reportes para dirección de talento.',
                'description' => 'Linden Educa organiza la formación de una compañía industrial con sedes en tres países. El producto cubre rutas, evaluación y evidencia de cumplimiento. El proyecto está pausado a la espera de una nueva fase de contenidos.',
                'problem' => 'La capacitación vivía en carpetas, videollamadas y un LMS genérico que nadie usaba. Dirección no podía demostrar cobertura ni calidad.',
                'solution' => 'Construimos un campus propio, alineado a roles y a la operación. Cada ruta deja evidencia. Los reportes hablan el idioma de talento y de planta, no el de una plataforma genérica.',
                'features' => ['Rutas por rol', 'Evaluaciones', 'Evidencia de cumplimiento', 'Catálogo interno', 'Reportes ejecutivos'],
                'results' => [
                    ['label' => 'Cobertura piloto', 'value' => '1.200 personas'],
                    ['label' => 'Cursos propios', 'value' => '46'],
                    ['label' => 'Estado', 'value' => 'En pausa'],
                ],
                'status' => ProjectStatus::Paused, 'year' => 2025, 'location' => 'Santiago, Chile',
                'client' => 'Grupo industrial', 'category' => 'plataformas-web',
                'cover' => '/images/covers/linden.svg', 'published' => true, 'featured' => false,
                'started_at' => '2024-11-01', 'finished_at' => null,
                'tech' => ['react', 'laravel', 'mysql', 'cloud', 'tailwind-css'],
                'team' => [
                    ['sofia-castro', 'Product Lead', 'Programa y stakeholders'],
                    ['laura-gomez', 'UI/UX Designer', 'Campus y lectura'],
                    ['diego-vargas', 'Cloud Engineer', 'Entornos y media'],
                ],
            ],
            [
                'name' => 'Quórum Cívico',
                'slug' => 'quorum-civico',
                'title' => 'Portal de participación y seguimiento público',
                'summary' => 'Una capa digital para consultas, seguimiento de acuerdos y publicación de evidencia institucional.',
                'description' => 'Quórum Cívico está en planificación. El consorcio trabaja con un gobierno local para abrir un canal de participación que no sea un buzón decorativo: cada consulta debe dejar rastro, plazo y respuesta.',
                'problem' => 'La ciudadanía no tenía un canal claro. Las consultas se perdían en correo y las respuestas no eran publicables. La institución no podía demostrar seguimiento.',
                'solution' => 'Estamos diseñando un modelo de consulta, expediente y publicación. La arquitectura privilegia evidencia, plazos y un lenguaje institucional sobrio.',
                'features' => ['Expediente de consulta', 'Plazos públicos', 'Publicación de evidencia', 'Roles institucionales', 'API de datos abiertos'],
                'results' => [
                    ['label' => 'Fase', 'value' => 'Arquitectura'],
                    ['label' => 'Mesas de trabajo', 'value' => '6'],
                    ['label' => 'Entrega prevista', 'value' => '2027'],
                ],
                'status' => ProjectStatus::Planning, 'year' => 2026, 'location' => 'Quito, Ecuador',
                'client' => 'Gobierno local', 'category' => 'datos-inteligencia',
                'cover' => '/images/covers/quorum.svg', 'published' => true, 'featured' => false,
                'started_at' => '2026-02-01', 'finished_at' => null,
                'tech' => ['laravel', 'react', 'postgresql', 'python', 'apis'],
                'team' => [
                    ['andres-rivas', 'Lead Developer', 'Arquitectura del expediente'],
                    ['mateo-herrera', 'Data & AI Engineer', 'Datos abiertos'],
                    ['sofia-castro', 'Product Lead', 'Gobernanza del producto'],
                ],
            ],
        ];

        foreach ($projects as $index => $item) {
            $project = Project::query()->updateOrCreate(
                ['slug' => $item['slug']],
                [
                    'category_id' => $categories[$item['category']]->id,
                    'name' => $item['name'],
                    'title' => $item['title'],
                    'summary' => $item['summary'],
                    'description' => $item['description'],
                    'problem' => $item['problem'],
                    'solution' => $item['solution'],
                    'features' => $item['features'],
                    'results' => $item['results'],
                    'status' => $item['status'],
                    'year' => $item['year'],
                    'location' => $item['location'],
                    'client' => $item['client'],
                    'cover' => $item['cover'],
                    'is_published' => $item['published'],
                    'is_featured' => $item['featured'],
                    'position' => $index + 1,
                    'meta_title' => $item['name'].' — QUILAB',
                    'meta_description' => $item['summary'],
                    'started_at' => $item['started_at'],
                    'finished_at' => $item['finished_at'],
                ]
            );

            $project->technologies()->sync(
                collect($item['tech'])->map(fn ($slug) => $technologies[$slug]->id)->all()
            );

            $sync = [];
            foreach ($item['team'] as $order => [$slug, $role, $responsibility]) {
                $sync[$members[$slug]->id] = [
                    'role' => $role,
                    'responsibility' => $responsibility,
                    'joined_at' => $item['started_at'],
                    'position' => $order,
                ];
            }
            $project->members()->sync($sync);

            if ($project->images()->count() === 0) {
                foreach (['01', '02'] as $n => $suffix) {
                    $project->images()->create([
                        'path' => $item['cover'],
                        'caption' => $item['name'].' · composición '.$suffix,
                        'alt' => 'Composición geométrica del proyecto '.$item['name'],
                        'position' => $n + 1,
                    ]);
                }
            }
        }
    }

    private function messages(): void
    {
        $rows = [
            [
                'name' => 'Elena Duarte', 'email' => 'elena.duarte@norteenergia.co', 'company' => 'Norte Energía',
                'project_type' => 'Sistemas empresariales', 'budget' => 'USD 80k – 120k',
                'message' => 'Buscamos un socio para reconstruir el sistema de mantenimiento de plantas. Hoy operamos con Excel y un software de 2012. Necesitamos un equipo que entienda operación industrial, no solo una interfaz nueva.',
                'status' => 'new',
            ],
            [
                'name' => 'Ricardo Beltrán', 'email' => 'rbeltran@andina.legal', 'company' => 'Andina Legal',
                'project_type' => 'Plataformas web', 'budget' => 'USD 40k – 70k',
                'message' => 'Queremos un portal para clientes corporativos: expedientes, plazos y un área privada. El contenido es sensible. Nos interesa hablar de arquitectura y de cómo trabajan con cumplimiento.',
                'status' => 'read', 'read_at' => now()->subDays(2),
            ],
            [
                'name' => 'Paula Méndez', 'email' => 'paula@tallerorbita.com', 'company' => 'Taller Órbita',
                'project_type' => 'Producto móvil', 'budget' => 'A definir',
                'message' => 'Tenemos un piloto de app para técnicos en campo. La app existe, pero se cae offline y no escala. ¿Pueden evaluar el código y proponernos una fase de estabilización?',
                'status' => 'new',
            ],
            [
                'name' => 'Jorge Han', 'email' => 'jhan@ciudadabierta.org', 'company' => 'Ciudad Abierta',
                'project_type' => 'Datos e inteligencia', 'budget' => 'Fondo público',
                'message' => 'Estamos armando un tablero de indicadores urbanos. Necesitamos un equipo que sepa de datos públicos, no de marketing. Quórum Cívico nos pareció un caso cercano.',
                'status' => 'archived',
            ],
        ];

        foreach ($rows as $row) {
            ContactMessage::query()->updateOrCreate(
                ['email' => $row['email'], 'company' => $row['company']],
                $row
            );
        }
    }
}
