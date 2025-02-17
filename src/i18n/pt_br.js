export default {
	language: 'Portugues BR',
	'$vuetify': {
		badge: 'Badge',
		// verificar onde fica o texto
		close: 'Fechar',
		dataIterator: {
			noResultsText: 'Nenhum registro correspondente encontrado',
			loadingText: 'Carregando itens...',
		},
		dataTable: {
			itemsPerPageText: 'Linhas por página:',
			ariaLabel: {
				sortDescending: 'Ordenado em ordem decrescente.',
				sortAscending: 'Ordenado em ordem crescente.',
				sortNone: 'Não classificado.',
				activateNone: 'Ative para remover a classificação.',
				activateDescending: 'Ative para classificar em ordem decrescente.',
				activateAscending: 'Ative para classificar em ordem crescente.',
			},
			sortBy: 'Ordenar por',
		},
		dataFooter: {
			itemsPerPageText: 'Itens por página:',
			itemsPerPageAll: 'Todos',
			nextPage: 'Próxima página',
			prevPage: 'Página anterior',
			firstPage: 'Primeira página',
			lastPage: 'Última página',
			pageText: '{0}-{1} de {2}',
		},
		datePicker: {
			itemsSelected: '{0} selecionado(s)',
		},
		noDataText: 'Sem dados disponíveis',
		carousel: {
			prev: 'Visual anterior',
			next: 'Próximo visual',
			ariaLabel: {
				delimiter: 'Carousel slide {0} de {1}',
			},
		},
		calendar: {
			moreEvents: '{0} mais',
		},
		fileInput: {
			counter: '{0} arquivo(s)',
			counterSize: '{0} arquivo(s) ({1} no total)',
		},
		timePicker: {
			am: 'AM',
			pm: 'PM',
		},
	},
	button: {
		add: {
			caption: 'Adicionar'
		},
		connect: {
			connect: 'Conectar',
			connecting: 'Conectando...',
			disconnect: 'Desconectar',
			disconnecting: 'Desconectando...'
		},
		emergencyStop: {
			caption: 'Parada de Emergência',
			title: 'Forçar uma reinicialização imediata do software (M112+M999)'
		},
		home: {
			caption: 'Home {0}',
			captionAll: 'Executar Home em todos os eixos',
			title: 'Executar Home no eixo {0} (G28 {0})',
			titleAll: 'Executar Home em todos os eixos (G28)'
		},
		newDirectory: {
			caption: 'Novo Diretório'
		},
		newFilament: {
			caption: 'Novo Filamento'
		},
		newFile: {
			caption: 'Novo Arquivo'
		},
		refresh: {
			caption: 'Atualizar'
		},
		reset: {
			caption: 'Reinicializar Máquina',
			title: 'Envie M999 para a máquina para reiniciá-la'
		},
		upload: {
			gcodes: {
				caption: 'Upload de Arquivo(s) G-Code',
				title: 'Upload um ou mais arquivos G-Code (arrastar e soltar também é suportado)'
			},
			start: {
				caption: 'Upload & Começar',
				title: 'Upload & Começar um ou mais arquivos G-Code (arrastar e soltar também é suportado)'
			},
			macros: {
				caption: 'Upload de Arquivo(s) Macro',
				title: 'Upload de um ou mais arquivos de macro (arrastar e soltar também é suportado)'
			},
			filaments: {
				caption: 'Upload de Config de Filamento',
				title: 'Upload de um ou mais configurações de filamento (arrastar e soltar também é suportado)'
			},
			menu: {
				caption: 'Upload de Arquivos de Menu',
				title: 'Upload de um ou mais arquivos de menu (arrastar e soltar também é suportado)'
			},
			system: {
				caption: 'Upload de Arquivos de Sistema',
				title: 'Upload de um ou mais arquivos de sistema (arrastar e soltar também é suportado)'
			},
			web: {
				caption: 'Upload de Arquivos Web',
				title: 'Upload de um ou mais arquivos web (arrastar e soltar também é suportado)'
			},
			update: {
				caption: 'Upload de Atualização',
				title: 'Upload de um pacote de atualização (arrastar e soltar também é suportado)'
			}
		}
	},
	chart: {
		layer: {
			caption: 'Gráfico da Camada',
			layerTime: 'Tempo da Camada',

			showLastLayers: 'Mostrar Últimas {0} Camadas',
			showAllLayers: 'Mostrar Todas Camadas',

			layer: 'Camada {0}',
			layerDuration: 'Duração: {0}',
			layerHeight: 'Altura da Camada: {0}',
			filamentUsage: 'Uso de Filamento: {0}',
			fractionPrinted: 'Progresso do Arquivo: {0}'
		},
		temperature: {
			caption: 'Gráfico de Temperatura',
			heater: 'Aquecedor {0}',
			sensor: 'Sensor {0}',
			noData: 'Sem dados'
		}
	},
	dialog: {
		changeMoveStep: {
			title: 'Mudar passo de movimento',
			prompt: 'Insira um novo valor para o botão:'
		},
		configUpdated: {
			title: 'Reiniciar placa?',
			prompt: 'Gostaria de reiniciar a sua placa para aplicar as configurações atualizadas?'
		},
		confirmCalibrationReset: {
			title: 'Redefinir para os padrões',
			prompt: 'Tem certeza de que deseja redefinir as configurações de calibração de etapas / mm para os valores padrão?'
		},
		confirmTouchProbe: {
			title: 'Execute a sequência do Touch Probe',
			prompt: 'Certifique-se de que a fresa de topo esteja acima do orifício Comece aqui com o clipe da sonda de toque conectado.',
			promptZ: 'Certifique-se de que a fresa de topo esteja em qualquer lugar acima da seção mais fina do Touch Probe, com o clipe do Touch Probe anexado.',
			checkWorking: 'Toque a placa da sonda contra a fresa para verificar se está funcionando corretamente.'

		},
		confirmTouchProbeReset: {
			title: 'Redefinir para os padrões',
			prompt: 'Tem certeza de que deseja redefinir as configurações do sensor de toque para os valores padrão?'
		},
		controlledPowerOffDialog: {
			message: 'Aguarde, máquina em pausa',
		},
		confirmPowerOffDialog: {
			message: 'A máquina pode agora ser desligada.'
		},
		touchProbeSuccess: {
			title: 'Sucesso',
			prompt: 'Sonda concluída. Trabalho definido como zero. Remova a sonda.'
		},
		connect: {
			title: 'Conectar à Máquina',
			prompt: 'Insira o nome do host e senha da máquina à qual deseja se conectar:',
			hostPlaceholder: 'Hostname',
			hostRequired: 'Hostname é obrigatório',
			passwordPlaceholderOptional: 'Senha (opcional)',
			passwordPlaceholder: 'Senha',
			passwordRequired: 'Senha é obrigatória',
			connect: 'Conectar'
		},
		connection: {
			connecting: 'Conectando...',
			disconnecting: 'Desconectando...',
			updating: 'Sguarde enquanto as atualizações estão sendo instaladas...',
			reconnecting: 'Conexão perdida, tentando reconectar...',
			standBy: 'Por favor espere...'
		},
		editExtrusionAmount: {
			title: 'Editar quantidade de extrusão',
			prompt: 'Insira um novo valor para o botão:'
		},
		editExtrusionFeedrate: {
			title: 'Editar a taxa de avanço de extrusão',
			prompt: 'Insira um novo valor para o botão:'
		},
		factoryReset: {
			title: 'Realizar redefinição de fábrica?',
			prompt: 'Tem certeza de que deseja redefinir os padrões de fábrica? Todas as configurações salvas serão perdidas.'
		},
		filament: {
			titleChange: 'Trocar Filamento',
			titleLoad: 'Carregar Filamento',
			prompt: 'Escolha um filamento:'
		},
		fileEdit: {
			gcodeReference: 'Referência do G-Code ',
			menuReference: 'Referência do Menu',
			save: 'Salvar',
			confirmClose: 'O arquivo foi alterado. Se você continuar, suas alterações serão perdidas.'
		},
		fileTransfer: {
			uploadingTitle: 'Fazendo Uploading do arquivo {0} de {1}, {2}% completo',
			uploadDoneTitle: 'Uploads Concluídos!',
			uploadFailedTitle: 'Falha no Upload!',
			downloadingTitle: 'Baicando Arquivo {0} de {1}, {2}% completo',
			downloadDoneTitle: 'Downloads Concluídos',
			downloadFailedTitle: 'Falha no Download!',
			filename: 'Nome do arquivo',
			size: 'Tamanho',
			progress: 'Progresso',
			currentSpeed: 'Velocidade Atual: {0}',
			cancelUploads: 'Cancelar Uploads',
			cancelDownloads: 'Cancelar Downloads'
		},
		meshEdit: {
			title: 'Definir parâmetros da malha',
			radius: 'Raio do Probe',
			spacing: 'Espaçamento',
			startCoordinate: 'Início da coordenada na direção {0}',
			endCoordinate: 'Final da coordenada na direção {0}',
			spacingDirection: 'Espaçamento na direção {0}'
		},
		newDirectory: {
			title: 'Novo Diretório',
			prompt: 'Insira um nome para o novo diretório:'
		},
		newFilament: {
			title: 'Novo Filamento',
			prompt: 'Insira um nome para o novo filamento:'
		},
		newFile: {
			title: 'Novo Arquivo',
			prompt: 'Insira um nome para o novo arquivo:'
		},
		powerLossConfirm: {
			title: 'Retomar da perda de energia?',
			prompt: 'Tem certeza de que deseja retomar um trabalho após uma queda de energia?'
		},
		powerLossSpindleConfirm: {
			title: 'Roteador / eixo ligado?',
			prompt: 'Confirme se o roteador / fuso está girado e no RPM correto.'
		},
		renameFile: {
			title: 'Renomear Arquivo ou Diretório',
			prompt: 'Insira um novo nome:'
		},
		resetHeaterFault: {
			title: 'Resetar Falha do Aquecedor',
			prompt: 'Ocorreu uma falha no aquecedor {0}. É altamente recomendável desligar a máquina agora e verificar a fiação antes de continuar. Se você tem certeza absoluta de que este não é um problema físico, você pode redefinir a falha do aquecedor SOB SEU PRÓPRIO RISCO. Esteja ciente de que isso NÃO É RECOMENDADO e pode levar a outros problemas. Como você gostaria de proceder?',
			resetFault: 'Reset Fault'
		},
		runMacro: {
			title: 'Executar {0}',
			prompt: 'Gostaria de executar {0}?'
		},
		startJob: {
			title: 'Iniciar {0}',
			prompt: 'Gostaria de iniciar {0}?'
		},
		update: {
			title: 'Instalar atualizações?',
			prompt: 'Você fez upload pelo menos de uma atualização de firmware. Você gostaria de instalá-la agora?',
			resetTitle: 'Redefinir firmware?',
			resetPrompt: 'Você acabou de instalar atualizações da placa de expansão. Você deseja reiniciar o controlador principal para restaurar a configuração anterior?'
		},
		workingAreaReset: {
			title: 'Redefinir Área de Trabalho',
			prompt: 'Selecione o modelo WorkBee que você gostaria de redefinir.',
			workbeeModel: 'WorkBee Model'
		},
		inputRequired: 'Por favor, insira um valor',
		numberRequired: 'Por favor, insira um número válido'
	},
	directory: {
		menu: 'Diretório de Menu',
		filaments: 'Diretório de Filamentos',
		gcodes: 'Diretório de G-Codes',
		macros: 'Diretório de Macros',
		system: 'Diretório do Sistema',
		web: 'Diretório WWW'
	},
	error: {
		notImplemented: '{0} não está implementado',
		invalidPassword: 'Senha inválida!',
		noFreeSession: 'Não há mais sessões livres!',
		connect: 'Falha ao conectar a {0}',
		disconnect: 'Não foi possível desconectar corretamente de {0}',
		disconnected: 'Não foi possível concluir a ação porque a conexão foi encerrada',
		cancelled: 'Operação foi cancelada',
		network: 'Erro de rede',
		timeout: 'A solicitação HTTP expirou',
		driveUnmounted: 'Unidade de destino está desmontada',
		directoryNotFound: 'Diretório {0} não encontrado',
		fileNotFound: 'Arquivo {0} não encontrado',
		invalidHeightmap: 'Mapa de Altura Inválido',
		operationFailed: 'A operação falhou (Motivo: {0})',
		uploadStartWrongFileCount: 'Apenas um único arquivo pode ser carregado e iniciado',
		uploadNoSingleZIP: 'Apenas um único arquivo ZIP pode ser carregado por vez',
		uploadNoFiles: 'Este ZIP não contém nenhum arquivo utilizável',
		codeResponse: 'Não foi possível executar o código porque uma resposta ruim foi recebida',
		codeBuffer: 'Não foi possível executar o código porque o espaço do buffer foi esgotado',
		enterValidNumber: 'Por favor, insira um número válido',
		turnOffEverythingFailed: 'Falha ao desligar tudo',
		filelistRequestFailed: 'Falha ao obter lista de arquivos',
		fileinfoRequestFailed: 'Falha ao obter informações do arquivo para {0}',
		filamentsLoadFailed: 'Falha ao carregar filamentos',
		move: 'Falha ao mover {0} para {1}'
	},
	events: {
		connected: 'Conectado a {0}',
		connectionLost: 'Falha ao manter conexão com {0}',
		emergencyStop: 'Parada de emergência, tentando reconectar ...',
		reconnecting: 'Conexão interrompida, tentando reconectar ...',
		reconnected: 'Conexão estabelecida',
		disconnected: 'Desconectado de {0}'
	},
	generic: {
		ok: 'OK',
		cancel: 'Cancelar',
		yes: 'Sim',
		no: 'Não',
		close: 'Fechar',
		reset: 'Resetar',
		noValue: 'n/a',
		loading: 'carregando',
		error: 'Erro',
		info: 'Informação',
		warning: 'Atenção',
		success: 'Sucesso',
		heaterStates: {
			off: 'desligado',
			standby: 'standby',
			active: 'ativo',
			fault: 'falha',
			tuning: 'afinação',
			offline: 'offline'
		},
		status: {
			starting: 'Iniciando',
			updating: 'Atualizando',
			off: 'Desligado',
			halted: 'Parado',
			pausing: 'Pausando',
			paused: 'Pausado',
			resuming: 'Retornando',
			printing: 'Imprimindo',
			processing: 'Processando',
			simulating: 'Simulando',
			busy: 'Ocupado',
			changingTool: 'Trocando Ferramenta',
			idle: 'Ociosa',
			unknown: 'Desconhecido'
		},
		rpm: 'RPM',
		sdCard: 'SD Card {0}',
		mounted: 'montado',
		notMounted: 'não montado',
		extracting: 'Extraindo',
		uploading: 'Fazendo Upload',
		active: 'Ativo',
		standby: 'Standby'
	},
	input: {
		code: {
			send: 'Enviar',
			placeholder: 'Enviar código...'
		},
		addTemperature: 'Valor da nova temperatura',
		addRPM: 'Valor da nova predefinição'
	},
	jobProgress: {
		simulating: 'Simulando {0}, {1} completo',
		simulated: 'Simulado {0}, 100% concluído',
		processing: 'Processando {0}, {1} concluído',
		processed: 'Processado {0}, 100% concluído',
		printing: 'Imprimindo {0}, {1} concluído',
		printed: 'Impresso {0}, 100% completo',
		noJob: 'Nenhum trabalho em execução.',
		layer: 'Camada {0} de {1}',
		filament: 'Uso de filamento: {0}',
		filamentRemaining: '{0} restantes',
		timeRemaining: 'Tempo estimado restante: {0}'
	},
	list: {
		baseFileList: {
			fileName: 'Nome do Arquivo',
			size: 'Tamanho',
			lastModified: 'Última modificação',
			download: 'Baixar Arquivo',
			edit: 'Editar Arquivo',
			rename: 'Renomear',
			delete: 'Deletar',
			downloadZIP: 'Baixar como ZIP',
			noFiles: 'Sem Arquivos ou Diretórios',
			driveUnmounted: 'Drive está desmontado',
			goUp: 'Subir nível'
		},
		menu: {
			noFiles: 'Sem arquivos para mostrar'
		},
		eventLog: {
			date: 'Data',
			type: 'Tipo',
			message: 'Evento',
			noEvents: 'Sem Eventos',
			clear: 'Limpar',
			downloadText: 'Baixar como Texto',
			downloadCSV: 'Baixar como CSV'
		},
		filament: {
			noFilaments: 'Sem Filamentos'
		},
		macro: {
			caption: 'Macros',
			noMacros: 'Sem Macros',
			run: 'Executar Macro',
			root: 'Raiz'
		},
		jobs: {
			height: 'Altura do Objeto',
			layerHeight: 'Altura da Camada',
			filament: 'Filament Usage',
			printTime: 'Tempo de Impressão',
			simulatedTime: 'Tempo Simulado',
			generatedBy: 'Gerado por',

			noJobs: 'Sem Tarefas',
			start: 'Iniciar Arquivo',
			simulate: 'Simular Arquivo'
		},
		system: {
			noFiles: 'Sem Arquivos de Sistema',
			configToolNote: 'editar pelo config tool'
		}
	},
	menu: {
		control: {
			caption: 'Controlar',
			dashboard: 'Dashboard',
			console: 'Console'
		},
		job: {
			caption: 'Tarefa',
			status: 'Status',
			webcam: 'Webcam'
		},
		files: {
			caption: 'Arquivos',
			jobs: 'Tarefas',
			filaments: 'Filamentos',
			macros: 'Macros',
			menu: 'Exibição',
			system: 'Sistema',
			web: 'Web'
		},
		plugins: {
			caption: 'Plugins'
		},
		settings: {
			caption: 'Configurações',
			general: 'Geral',
			machine: 'Especificações da máquina'
		}
	},
	notification: {
		calibration:{
			message: 'Calibração de etapas / mm atualizada',
		},
		compress: {
			title: 'Compactando arquivos ...',
			message: 'Aguarde enquanto seus arquivos estão sendo compactados ...',
			errorTitle: 'Falha ao compactar arquivos'
		},
		decompress: {
			title: 'Descompactando arquivos ...',
			message: 'Aguarde enquanto seus arquivos estão sendo descompactados ...',
			errorTitle: 'Falha ao descompactar arquivos'
		},
		delete: {
			errorTitle: 'Falha ao excluir {0}',
			errorMessageDirectory: 'Certifique-se de que este diretório está vazio',
			success: '{0} Excluído com sucesso',
			successMultiple: '{0} itens excluídos com sucesso'
		},
		deleteFilament: {
			errorTitle: 'Falha ao excluir filamento(s)',
			errorStillLoaded: 'Pelo menos um dos filamentos selecionados ainda está carregado. Descarregue-os antes de continuar',
			errorSubDirectories: 'O filamento {0} contém subdiretórios. Exclua-os manualmente e tente novamente.'
		},
		download: {
			title: 'Baixando {0} @ {1}, {2}% concluído',
			message: 'Aguarde enquanto o arquivo está sendo baixado ...',
			success: 'Download de {0} bem-sucedido após {1}',
			error: 'Falha ao baixar {0}'
		},
		message: 'Mensagem',
		mount: {
			successTitle: 'Cartão SD montado',
			errorTitle: 'Falha ao montar o cartão SD'
		},
		newDirectory: {
			errorTitle: 'Falha ao criar diretório',
			successTitle: 'Diretório criado',
			successMessage: 'SDiretório {0} criado com sucesso'
		},
		newFilament: {
			errorTitle: 'Falha ao criar filamento',
			errorTitleMacros: 'Falha ao criar macros de filamento',
			successTitle: 'Filamento criado',
			successMessage: 'Filamento {0} criado com sucesso'
		},
		rename: {
			success: 'Renomeado {0} para {1} com sucesso',
			error: 'Falha ao renomear {0} para {1}',
		},
		renameFilament: {
			errorTitle: 'Falha ao renomear filamento',
			errorStillLoaded: 'Este filamento ainda está carregado. Descarregue-o antes de continuar'
		},
		responseTooLong: 'Resposta muito longa, consulte o Console',
		upload: {
			title: 'Enviando {0} @ {1}, {2}% concluído',
			message: 'Aguarde enquanto o arquivo está sendo carregado ...',
			success: 'Upload de {0} bem-sucedido após {1}',
			error: 'Falha ao carregar {0}'
		},
		workingArea: {
			message: 'Área de trabalho atualizada'
		}
	},
	panel: {
		atx: {
			caption: 'Fonte ATX',
			on: 'Ligado',
			off: 'Desligado'
		},
		babystepping: {
			caption: 'Z Babystepping',
			current: 'Offset atual: {0}'
		},
		extrude: {
			caption: 'Controle de Extrusão',
			mix: 'Mix',
			mixRatio: 'Proporção do Mix:',
			amount: 'Quantidade de material em {0}:',
			feedrate: 'Velocidade de avanço em {0}:',
			retract: 'Retract',
			extrude: 'Extrução'
		},
		extrusionFactors: {
			caption: 'Fatores de Extrusão',
			changeVisibility: 'Alterar Visibilidade',
			extruder: 'Extrusora {0}',
			noExtruders: 'Sem Extrusoras'
		},
		fan: {
			caption: 'Controle do Cooler',
			selection: 'Seleção do Cooler:',
			toolFan: 'Cooler da Ferramenta',
			fan: 'Cooler {0}'
		},
		fans: {
			caption: 'Coolers',
			changeVisibility: 'Alterar Visibilidade',
			toolFan: 'Cooler da Ferramenta',
			fan: 'Coolet {0}',
			noFans: 'Sem Cooler'
		},
		jobControl: {
			caption: 'Controle de Tarefa',
			cancelJob: 'Cacelar Tarefa',
			cancelPrint: 'Cancelar Impressão',
			cancelSimulation: 'Cancelar Simulação',
			pauseJob: 'Pausar Tarefa',
			pausePrint: 'Pausar Impressão',
			pauseSimulation: 'Pausar Simulação',
			resumeJob: 'Retornar Tarefa',
			resumePrint: 'Retornar Impressão',
			resumeSimulation: 'Retornar Simulação',
			repeatJob: 'Iniciar Novamente',
			repeatPrint: 'Imprimir Novamenten',
			repeatSimulation: 'Simular Novamente',
			autoSleep: 'Ativar suspensão automática',
			powerLossResume: 'Power Loss Resume',
			controlledPowerOff: 'Desligamento controlado',
			captionPowerLoss: 'Power Loss Job Control'
		},
		jobData: {
			caption: 'Dados coletados',
			warmUpDuration: 'Tempo de Aquecimento',
			currentLayerTime: 'Tempo da Camada Atual',
			lastLayerTime: 'Tempo da Última Camada',
			jobDuration: 'Duração da Tarefa'
		},
		jobEstimations: {
			caption: 'Estimativas baseadas em',
			filament: 'Uso de filamento',
			file: 'Progresso do Arquivo',
			layer: 'Tempo da Camada',
			slicer: 'Fatiador',
			simulation: 'Simulação'
		},
		jobInfo: {
			caption: 'Informação da Tarefa',
			height: 'Altura:',
			layerHeight: 'Altura da Camada:',
			filament: 'Uso de filamento:',
			generatedBy: 'Gerado por:'
		},
		movement: {
			caption: 'Movimento da Máquina',
			compensation: 'Compensação & Calibração',
			runBed: 'Nivelamento da Mesa Real (G32)',
			runDelta: 'Calibração Delta (G32)',
			compensationInUse: 'Compensação em uso: {0}',
			disableBedCompensation: 'Desativar Compensação da Mesa (M561)',
			disableMeshCompensation: 'Desativar Compensação de Malha (G29 S2)',
			editMesh: 'Definir Área para Compensação de Malha (M557)',
			runMesh: 'Executar Compensação de Malha (G29)',
			loadMesh: 'Carregar Mapa de Altura Salvo no Cartão SD (G29 S1)',
			axesNotHomed: 'O eixo a seguir não está na posição inicial:|Os eixos a seguir não estão na posição inicial:',
			noAxes: 'No Axes',
			workzero: 'Vá para o trabalho zero'
		},
		sensors: {
			endstopTriggered: 'Provocado',
			endstopNotTriggered: 'Não acionado',
			endstopStatus: 'Status de parada final'
		},
		settingsAbout: {
			caption: 'Sobre',
			developedBy: 'Interface da Web desenvolvida por',
			for: 'para',
			licensedUnder: 'Licenciado nos termos de'
		},
		settingsAppearance: {
			caption: 'Aparência',
			darkTheme: 'Modo Noturno',
			language: 'Idioma',
			binaryFileSizes: 'Use tamanhos de arquivo binários',
			binaryFileSizesTitle: 'Os tamanhos dos arquivos são exibidos com base em 1024 (IEC) em vez de 1000 (SI)',
			disableAutoComplete: 'Desativar preenchimento automático',
			disableAutoCompleteTitle: 'Não mostrar a lista de autocompletar ao digitar o código ou as entradas de temperatura'
		},
		settingsCommunication: {
			caption: 'Comunicação',
			pingInterval: 'Intervalo de PING quando inativo (ms)',
			updateDelay: 'Atraso na atualização (ms)',
			ajaxRetries: 'Número máximo de novas tentativas AJAX',
			updateInterval: 'Intervalo de atualização ({0})',
			extendedUpdateEvery: 'Intervalo de atualização de status estendido',
			fileTransferRetryThreshold: 'Limite de novas tentativas para transferências de arquivos ({0})',
			crcUploads: 'Utilizar CRC32 checksums para uploads',
			unavailable: 'Nenhuma configuração disponível'
		},
		settingsElectronics: {
			caption: 'Eletrônicas',
			diagnostics: 'Diagnósticos',
			board: 'Placa: {0}',
			firmware: 'Firmware: {0} ({1})',
			dwsFirmware: 'Versão do Duet WiFi Server: {0}',
			sysVersion: 'Versão das configurações do sistema: {0}',
			updateNote: 'Nota: Você pode instalar atualizações na página Sistema.'
		},
		settingsEndstops: {
			caption: 'Endstops',
			index: 'Índice',
			triggered: 'Disparado'
		},
		settingsGeneral: {
			caption: 'Geral',
			factoryReset: 'Reverter para os padrões de fábrica',
			settingsStorageLocal: 'Salvar configurações no armazenamento local',
			settingsSaveDelay: 'Atualizar atraso para alterações nas configurações ({0})',
			cacheStorageLocal: 'Salvar cache no armazenamento local',
			cacheSaveDelay: 'Atualizar atraso para alterações de cache ({0})'
		},
		settingsListItems: {
			caption: 'Lista de Itens',
			toolTemperatures: 'Temperaturas da ferramenta',
			bedTemperatures: 'Temperatura da Mesa',
			chamberTemperatures: 'Temperatura da Câmara',
			spindleRPM: 'RPM do Fuso'
		},
		settingsMachine: {
			caption: 'Especificação da Máquina',
			babystepAmount: 'Valor do babystep ({0})',
			moveFeedrate: 'Velocidade de avanço para botões de movimento ({0})'
		},
		settingsNotifications: {
			caption: 'Notificações',
			notificationErrorsPersistent: 'Não fechar mensagens de erro automaticamente',
			notificationTimeout: 'Tempo de espera pré-determinado para notificações ({0})'
		},
		settingsTouchProbe: {
			caption: 'Configurações do sensor de toque',
			touchProbeEnableCaption: 'Enable Touch Probe',
			touchProbeEndstopNumberCaption: 'Endstop Number',
			touchProbeFeedRateCaption: 'Feedrate (mm/min)',
			touchProbeXDimensionCaption: 'Dimensão X (mm)',
			touchProbeYDimensionCaption: 'Dimensão Y (mm)',
			touchProbeZDimensionCaption: 'Dimensão Z (mm)',
			touchProbeXOffsetCaption: 'X-Axis Offset (mm)',
			touchProbeYOffsetCaption: 'Y-Axis Offset (mm)',
			touchProbeZOffsetCaption: 'Z-Axis Offset (mm)',
			touchProbeRevert: 'Redefinir para padrões',
			touchProbeTriggerCaption: 'Touch Probe Trigger Level',
			touchProbeActiveHigh: 'Active High',
			touchProbeActiveLow: 'Active Low',
			touchProbeType: 'Tipo de sonda de toque',
			touchProbeXYZ: 'XYZ Touch Probe',
			touchProbeZ: 'Z Touch Probe',
		},
		settingsWebcam: {
			caption: 'Webcam',
			webcamURL: 'URL da Webcam (opcional)',
			webcamUpdateInterval: 'Intervalo de atualização da webcam ({0})',
			webcamLiveURL: 'URL para abrir quando a imagem da webcam é clicada (opcional)',
			webcamFix: 'Não acrescente qualificador HTTP extra ao recarregar imagens',
			webcamEmbedded: 'Incorporar imagem da webcam em um iframe',
			webcamRotation: 'Rotacionar imagem da webcam',
			webcamFlip: 'Espelhar imagem da webcam',
			flipNone: 'Nenhum',
			flipX: 'Espelhar em X',
			flipY: 'Espelhar em Y',
			flipBoth: 'Espelhar em ambos'
		},
		settingsWorkingArea: {
			caption: 'Área de Trabalho da Máquina',
			axisLabel: '{0}-Axis (mm)',
			resetWorkingArea: 'Redefinir área de trabalho',
		},
		settingsCalibration: {
			caption: 'Maszyna Kroki/mm Kalibrowanie',
			axisLabel: '{0}-Axis (Kroki/mm)',
			resetCalibration: 'Redefinir Kroki/mm Calibration',
		},
		spindleSpeed:{
			caption: 'Fusos',
			tool: 'Ferramenta {0}',
			spindleName: 'Nome do fuso',
			spindleActive: 'Ativo',
			setRPM: 'Definir RPM',
			noSpindleDefined: 'Nenhuma ferramenta de eixo definida. Usar ',
			toDefineASpindle: ' para definir um fuso e ',
			toAssignTool: ' para atribuir aquele fuso a uma ferramenta.',
			turnOn: 'Ligar',
			turnOff: 'desligar'
		},
		speedFactor: {
			caption: 'Fator de velocidade'
		},
		spindle: {
			spindle : 'Fuso',
			active : 'Ativo',
			direction : 'Direção',
			currentRPM : 'Atual RPM',
			setRPM : 'Definir RPM',
			on : 'Sobre',
			off : 'Desligada',
			forward : 'para a frente',
			reverse : 'reverso'
		},
		status: {
			caption: 'Status',
			mode: 'Modo: {0}',
			toolPosition: 'Posição da Ferramenta',
			machinePosition: 'Posição da Máquina',
			extruders: 'Drivers de Extrusora',
			extruderDrive: 'Driver {0}',
			speeds: 'Velocidades',
			requestedSpeed: 'Velocidade Solicitada',
			topSpeed: 'Velocidade Máxima',
			sensors: 'Sensores',
			mcuTemp: 'Temperatura do MCU',
			minMax: 'Mínimo: {0}, Máximo {1}',
			vIn: 'Vin',
			v12: 'V12',
			fanRPM: 'RPM do Cooler',
			probe: 'Probe|Probes',
			noStatus: 'Sem Status'
		},
		tools: {
			caption: 'Ferramentas',
			controlAll: 'Controlar Todos',
			turnEverythingOff: 'Desligar Tudo',
			allActiveTemperatures: 'Definir todas as temperaturas ativas',
			allStandbyTemperatures: 'Definir todas as temperaturas de espera',
			tool: 'Ferramenta {0}',
			loadFilament: 'Carregar Filamento',
			changeFilament: 'Mudar Filamento',
			unloadFilament: 'Descarregar Filamento',
			heater: 'Aquecedor {0}',
			current: 'Atual',
			active: 'Ativo',
			standby: 'Em espera',
			bed: 'Mesa {0}',
			chamber: 'Câmara {0}',
			extra: {
				caption: 'Extra',
				sensor: 'Sensor',
				sensorIndex: 'Sensor {0}',
				value: 'Valor',
				showInChart: 'Mostrar no Gráfico',
				noItems: 'Sem Sensores Extra'
			},
			noTools: 'Sem Ferramentas'
		},
		touchProbePanel: {
			caption: 'Contrôle de la sonde tactile',
			endmillDiameter: 'Diamètre de la fraise (mm)',
			probeAxisCaption: 'Sonde Axe Individuel',
			probeXTitle: 'Sonde Axe X',
			probeXCaption: 'X',
			probeYTitle: 'Sonde Axe Y',
			probeYCaption: 'Y',
			probeZTitle: 'Sonde Axe Z',
			probeZCaption: 'Z',
			probeCornerTitle: 'Coin de la sonde',
			probeCornerCaption: 'Coin de la sonde',
			probeLocation: 'Emplacement de la sonde',
			probeLocationFrontLeft: 'Coin avant gauche',
			probeLocationFrontRight: 'Coin avant droit',
			probeLocationBackLeft: 'Coin arrière gauche',
			probeLocationBackRight: 'Coin arrière droit',
			probeStatus: 'État de la sonde:',
			probeTriggered: 'Déclenché',
			probeNotTriggered: 'Non déclenché'
		},
		webcam: {
			caption: 'Vigilância por webcam',
			alt: '(imagem da webcam)'
		}
	},
	plugins: {
		autoUpdate: {
			menuCaption: 'Atualização'
		},
		CNCGCodeViewer: {
			background: 'Cor de fundo',
			bedRenderMode:  'Cor da grade da cama',
			viewerSettings: 'Configurações do visualizador',
			progressSettings: 'Configurações de progresso'
		},
		gcodeViewer: {
			caption: 'Vizualizador de G-Code',
			view3D: 'Ver 3D',
			fullscreen: 'Tela cheia',
			showConfiguration: 'Mostrar Configuração do Visualizador',
			resetCamera: {
				caption : 'Reiniciar Câmera',
				title: 'Redefinir a câmera para a posição inicial'
			},
			cancelLoad: 'Cancelar o carregamento do arquivo',
			reloadView: { 
				caption : 'Recarregar visualização',
				title : 'Recarregue o gcode atual, ele é usado ao alterar configurações como cor, cor da taxa de alimentação, etc.'
			},
			loadCurrentJob:  { 
				caption :'Carregar Tarefa Atual',  
				title : 'Carregar a impressão ou simulação atual'
			},
			unloadGCode:  { 
				caption: 'Descarregar G-Code',
				title : 'Remover o gcode carregado do visualizador'
			},
			loadLocalGCode: { 
				caption : 'Carregar G-Code local',
				title : 'Carregue um arquivo de sua unidade local para o visualizador'
			},
			showCursor: 'Mostrar Cursor',
			showTravels: 'Mostrar Viagens',
			renderQuality: {
				caption : 'Qualidade de Renderização',
				title : 'Ajuste a qualidade de visualização do visualizador. Quanto mais alto o nível mais vértices e modos de renderização ficam disponíveis'
			},
			sbc: 'SBC',
			low: 'Baixo',
			medium: 'Médio',			
			high: 'Alto',
			ultra: 'Ultra',
			max: 'Máximo',
			forceLineRendering: 'Renderização de Linha de Força',
			transparency: 'Transparência',
			showSolid: 'Mostrar Sólido',
			spreadLines: 'Spread Lines',
			extruders: {
				caption:  'Extrusoras',
				title : 'Define a cor usada para renderizar uma extrusora'
			},
			tool: 'Ferramenta {0}',
			resetColor: 'Redefinir a cor da ferramenta | Redefinir as cores da ferramenta',
			renderMode : {
				caption : 'Modo de renderização | Modos de renderização',
				title : 'O modo de renderização permite que você defina a cor da extrusora ou a coloração da linha de avanço no visualizador'
			},
			color: 'Cor',
			feedrate: 'Velocidade de Alimentação',
			minFeedrate: 'Velocidade Mímima de Alimentação (mm/s)',
			maxFeedrate: 'Velocidade Máxima de Alimentação (mm/s)',
			minFeedrateColor: 'Cor da Velocidade Mímima de Alimentação',
			maxFeedrateColor: 'Cor da Velocidade Máxima de Alimentação',
			progress: {
				caption : 'Progresso',
				title: 'Defina a cor impressa para monitorar o progresso'
			},
			topClipping: 'Corte Superior',
			bottomClipping:'Corte Inferior',
			progressColor: 'Cor de Progresso',
			liveZTracking: 'Acompanhamento ao vivo do eixo Z',
			settings: 'Configurações',
			background: 'Plano de Fundo',
			bedRenderMode:  'Modo de Renderização da Mesa',
			bed: 'Mesa',
			volume: 'Volume',
			showAxes: 'Mostrar Eixos',
			showObjectLabels: 'Mostrar Rótulos de Objetos',
			cameraInertia: 'Camera Inertia',
			showObjectSelection: {
				caption : 'Mostrar Seleção de Objeto',
				title : 'Ativado se objetos pudessem ser detectados na impressão atual'
			},
			renderFailed: 'A renderização anterior falhou. Configurando a qualidade de renderização para SBC',
		},
		heightmap: {
			menuCaption: 'Mapa de Altura',
			listTitle: 'Mapas de Altura',
			none: 'Nenhum',
			scale: 'Escala:',
			orMore: 'ou mais',
			orLess: 'ou menos',
			axes: 'Eixos:',
			notAvailable: 'mapa de altura não disponível',
			statistics: 'Estatisticas',
			numPoints: 'Número de pontos: {0}',
			radius: 'Raio de Probing: {0}',
			area: 'Área de Probe: {0}',
			maxDeviations: 'Desvios máximos: {0} / {1}',
			meanError: 'Erro médio: {0}',
			rmsError: 'Erro RMS: {0}',
			display: 'Exibição',
			colorScheme: 'Esquema de cores:',
			terrain: 'Terreno',
			heat: 'Calor',
			invertZ: 'Inverter coordenadas Z',
			topView: 'Vista Superior',
		},
		objectModelBrowser: {
			menuCaption: 'Modelo de Objeto'
		}
	},
	tabs: {
		generalSettings: {
			caption: 'Geral'
		},
		machineSettings: {
			caption: 'Geral'
		},
		plugins: {
			caption: 'Plugins',
			headers: {
				name: 'Nome',
				author: 'Autor',
				version: 'Versão',
				license: 'Licença',
				components: 'Componentes',
				dependencies: 'Dependências',
				status: 'Status'
			},
			optional: 'opcional',
			start: 'Início',
			partiallyStarted: 'parcialmente iniciado',
			started: 'iniciado',
			stop: 'Parar',
			deactivated: 'desativado',
			stopped: 'parado',
			uninstall: 'Desinstalar',
			noPlugins: 'Sem Plugins',
			refreshNote: 'Atualize a página para terminar de descarregar alguns plug-ins DWC'
		}
	}
}